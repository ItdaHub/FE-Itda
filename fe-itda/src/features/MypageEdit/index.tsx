import React, { useRef, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import Image from "next/image";

import profileStactic from "@/assets/images/img_profile_static.svg";
import profileEdit from "@/assets/images/img_profile_edit.svg";
import { MypageEditStyled } from "./styled";
import clsx from "clsx";

const MypageEdit = () => {
  // 닉네임과 이미지 상태 관리
  const [nickName, setNickName] = useState<string>(""); // 닉네임

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 모달 열기/닫기
  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  // 프로필 이미지 변경 모달 열기
  const handleImgModal = () => {
    setIsModalOpen(true);
  };

  // 프로필 이미지 변경 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 이미지 선택 후 미리보기 업데이트
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader로 이미지 URL을 읽어 미리보기 설정
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setProfileImagePreview(e.target.result as string); // 미리보기 이미지 설정
      };
      reader.readAsDataURL(file);
      setImage(file); // 선택한 파일 저장
    }
    setIsModalOpen(false); // 파일을 선택한 후 모달 닫기
  };

  // 앨범에서 이미지 선택 클릭 시 파일 선택 창 띄우기
  const handleImageSelectFromAlbum = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 창 열기
    }
  };

  // 기본 이미지로 설정하는 함수
  const handleSetDefaultImage = () => {
    setProfileImagePreview(null); // 미리보기 이미지 초기화
    setImage(null); // 선택된 이미지 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // 닉네임 변경 핸들러
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  // 저장하기 핸들러
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // FormData로 이미지와 닉네임을 한 번에 보내기
    const formData = new FormData();
    formData.append("nickname", nickName);
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      const response = await axios.put("/auth/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("정보 수정 성공:", response.data);
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <MypageEditStyled className={clsx("mypage-edit")}>
      <form onSubmit={handleSave}>
        {/* 이미지 수정 */}

        <div className="label">
          <div className="userEdit-image" onClick={handleImgModal}>
            <Image
              src={image ? URL.createObjectURL(image) : profileStactic} // 선택된 이미지 또는 기본 이미지
              alt="프로필 사진"
              priority
              width={150}
              height={150}
            />
            <div className="edit-icon">
              <Image
                className="edit-profile"
                src={profileEdit}
                alt="프로필 편집"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>

        {/* 프로필 이미지 변경 모달 */}
        <Modal
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
          centered
        >
          <div className="profile-modal">
            <div className="profile-modal-btn">
              <button onClick={handleImageSelectFromAlbum}>
                앨범에서 이미지 선택
              </button>
              {/* 파일 input (숨겨진 상태) */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }} // 기본적으로 숨기기
                onChange={handleImageChange} // 파일 선택 시 핸들러 호출
              />
              <button onClick={handleSetDefaultImage}>기본 이미지 설정</button>
              <button onClick={handleModalClose}>취소</button>
            </div>
          </div>
        </Modal>
        {/* <div>
          <button onClick={handleImageSelectFromAlbum}>
            앨범에서 이미지 선택
          </button>
          <button onClick={handleSetDefaultImage}>기본 이미지 설정</button>
          <button onClick={handleModalClose}>취소</button>
        </div> */}

        {/* 닉네임 수정 */}
        <div className="input-nickname">
          {/* <label htmlFor="nickname">닉네임</label> */}
          <input
            type="text"
            id="nickname"
            value={nickName}
            onChange={handleNickNameChange}
            placeholder="새 닉네임을 입력하세요"
          />
        </div>
        <div className="submit-btn">
          <button type="submit">저장하기</button>
        </div>
      </form>
    </MypageEditStyled>
  );
};

export default MypageEdit;
