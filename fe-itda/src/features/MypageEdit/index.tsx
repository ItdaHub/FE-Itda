import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import profileStactic from "@/assets/images/img_profile_static.svg";
import profileEdit from "@/assets/images/img_profile_edit.svg";
import { ImageModal, MypageEditStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import router from "next/router";

interface Props {
  nickName: string;
}

const MypageEdit = ({ currentNickname }: { currentNickname: string }) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setNickName(user.nickname);
      if (user.profile_img) {
        setProfileImagePreview(user.profile_img);
      }
    }
  }, [user]);

  // 이미지 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 모달 열기/닫기
  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  // 닉네임 관리
  const [nickName, setNickName] = useState<string>("");
  const [nickNameMessage, setNickNameMessage] = useState({
    type: "", // "error" | "success"
    text: "",
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임이 바뀌면 중복체크 확인 후 저장

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // 닉네임 변경
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    setIsNicknameChecked(false); // 닉네임 바뀌면 중복 확인 초기화
    setNickNameMessage({
      type: "",
      text: "",
    });
  };

  // 닉네임 중복 검사
  const handleCheckNickName = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!nickName.trim()) {
      setNickNameMessage({ type: "error", text: "닉네임을 입력해주세요." });
      return;
    }

    const isValid = nickName.length >= 2 && nickName.length <= 8;
    if (!isValid) {
      setNickNameMessage({
        type: "error",
        text: "닉네임은 2~8자 사이여야 합니다.",
      });
      return;
    }

    if (nickName === currentNickname) {
      setNickNameMessage({
        type: "success",
        text: "현재 사용 중인 닉네임입니다.",
      });
      setIsNicknameChecked(true); // 현재 닉네임이지만 통과시킴
    }

    try {
      const res = await api.post("/auth/nicknameCheck/edit", { nickName });
      setNickNameMessage({ type: "success", text: res.data.message });
      setIsNicknameChecked(true);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "닉네임 중복 확인 중 오류가 발생했습니다.";
      setNickNameMessage({ type: "error", text: message });
      setIsNicknameChecked(false);
    }
  };

  // 저장하기 (axios 요청)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickName.trim()) {
      setNickNameMessage({ type: "error", text: "닉네임을 입력해주세요." });
      return;
    }

    if (nickName.length < 2 || nickName.length > 8) {
      setNickNameMessage({
        type: "error",
        text: "닉네임은 2~8자 사이여야 합니다.",
      });
      return;
    }

    if (nickName === currentNickname) {
      setNickNameMessage({
        type: "success",
        text: "",
      });
    }

    if (nickName !== currentNickname && !isNicknameChecked) {
      setNickNameMessage({
        type: "success",
        text: "닉네임 중복 확인을 해주세요.",
      });
      return;
    }

    let updated = false;

    // // ✅ 1. 기본 이미지로 설정된 경우: 삭제 요청
    // if (!image && !profileImagePreview && user?.profile_img) {
    //   try {
    //     await api.delete("/users/me/profile-image");
    //     updated = true;
    //   } catch (error) {
    //     console.error("프로필 이미지 삭제 실패:", error);
    //     alert("기본 이미지로 설정 중 오류가 발생했습니다.");
    //     return;
    //   }
    // }

    // 프로필 이미지 변경된 경우에만 요청
    if (image) {
      const formData = new FormData();
      formData.append("profileImage", image);

      try {
        await api.put("/users/me/profile-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updated = true;
      } catch (error) {
        console.error("프로필 이미지 수정 실패:", error);
        alert("프로필 이미지 수정 중 오류가 발생했습니다.");
        return;
      }
    }

    // 닉네임 변경된 경우에만 요청
    if (nickName !== currentNickname) {
      try {
        await api.put(
          "/users/me/nickname",
          { nickname: nickName },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        updated = true;
      } catch (error) {
        console.error("닉네임 수정 실패:", error);
        alert("닉네임 수정 중 오류가 발생했습니다.");
        return;
      }
    }

    if (updated) {
      alert("정보가 수정되었습니다.");
      router.reload();
    } else {
      alert("변경된 정보가 없습니다.");
    }
  };

  return (
    <MypageEditStyled className={clsx("mypage-edit")}>
      <form onSubmit={handleSave}>
        {/* 이미지 수정 */}

        <div className="label">
          <div className="userEdit-image" onClick={handleImgModal}>
            {/* <Image
              src={image ? URL.createObjectURL(image) : profileStactic} // 선택된 이미지 또는 기본 이미지
              alt="프로필 사진"
              priority
              width={150}
              height={150}
            /> */}
            {/* <Image
              src={`http://localhost:5001/uploads/profiles/${profileImagePreview}`}
              alt="프로필 사진"
              width={150}
              height={150}
            /> */}
            <Image
              src={
                image
                  ? URL.createObjectURL(image) // 1순위: 선택된 새 이미지
                  : profileImagePreview
                  ? `http://localhost:5001/uploads/profiles/${profileImagePreview}` // 2순위: 서버에 저장된 유저 이미지
                  : profileStactic // 3순위: 기본 이미지
              }
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
        <ImageModal
          className="image-modal"
          open={isModalOpen}
          // onCancel={handleModalClose}
          closable={false}
          footer={null}
          centered
          width={350}
          height={200}
        >
          <div className="image-modal-container">
            <div className="image-modal-btn">
              <button className="album" onClick={handleImageSelectFromAlbum}>
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
              <button className="album" onClick={handleSetDefaultImage}>
                기본 이미지 설정
              </button>
              <button className="album" onClick={handleModalClose}>
                취소
              </button>
            </div>
          </div>
        </ImageModal>

        {/* 닉네임 수정 */}
        <div className="input-nickname">
          <input
            type="text"
            id="nickname"
            value={nickName}
            onChange={handleNickNameChange}
            placeholder="새 닉네임을 입력하세요"
          />
          <button
            type="button"
            className="check-button"
            onClick={handleCheckNickName}
          >
            중복
          </button>
        </div>
        {nickNameMessage.text && (
          <div
            className={
              nickNameMessage.type === "error"
                ? "error-message"
                : "success-message"
            }
          >
            {nickNameMessage.text}
          </div>
        )}
        <div className="submit-btn">
          <button type="submit">저장하기</button>
        </div>
      </form>
    </MypageEditStyled>
  );
};

export default MypageEdit;
