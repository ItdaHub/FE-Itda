import MyDocument from "@/pages/_document";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MyPageStyled } from "./styled";
import clsx from "clsx";
import Image from "next/image";
// 프로필 이미지 기본 이미지
import profileStactic from "@/assets/images/img_profile_static.svg";
// 프로필 이미지 편집 버튼
import profileEdit from "@/assets/images/img_profile_edit.svg";
import { Modal } from "antd";

const Mypage = () => {
  const [email, setEmail] = useState(); // 기본 값은 데이터베이스에서 받아옴
  const [nickname, setNickname] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
  const [name, setName] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
  const [birth, setBirth] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
  const [phoneNumber, setPhoneNumber] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const [profileDefaultImg, setProfileDefaultImg] = useState("profileStactic");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store image URL (for display)
  // `fileInputRef`의 타입을 HTMLInputElement로 설정
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 모달 토글 함수
  const handleImgModal = () => {
    setIsModalOpen(true);
  };

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
    // setImage(URL.createObjectURL(file));
  };

  // 앨범에서 이미지 선택 버튼 클릭 시 파일 선택 창 띄우기
  const handleImageSelectFromAlbum = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click event
    }
  };

  // 앨범에서 이미지 선택 버튼 클릭 시 파일 선택 창 띄우기
  // const handleImageSelectFromAlbum = () => {
  //   document.getElementById("input-file").click(); // Trigger file input click event
  // };

  // 🔹 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 저장하기 버튼 클릭 시 업데이트 요청(닉네임,휴대폰번호)
  const handleSave = () => {
    const updateUserData = { nickname, phoneNumber };
    try {
      const response = axios.put("/api/user/profile", {
        data: { updateUserData },
      });
    } catch (error) {}
  };

  return (
    <MyPageStyled className={clsx("my-page")}>
      <div className="mypage-box">
        <h3>내 정보 수정</h3>
        <form className="user-edit">
          {/* <div className="userEdit-image" onClick={handleImgModal}>
            {!isModalOpen && (
              <Modal>
                <div>
                  <button
                    onClick={() => {
                      handleImageChange;
                    }}
                  >
                    앨범에서 이미지 선택
                  </button>
                  <button>기본 이미지 설정</button>
                  <button onClick={handleModalClose}>취소</button>
                </div>
              </Modal>
            )}
            <Image src={profileStactic} alt="프로필 사진" priority />
            <div className="edit-icon">
              <label htmlFor="input-file">
                <input
                  type="file"
                  id="input-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Image
                  className="edit-profile"
                  src={profileEdit}
                  alt="프로필 편집"
                />
              </label>
            </div>
          </div> */}

          {/* 프로필 이미지 */}
          <label htmlFor="input-file">
            <div className="userEdit-image" onClick={handleImgModal}>
              <Image src={profileStactic} alt="프로필 사진" priority />
              <div className="edit-icon">
                <Image
                  className="edit-profile"
                  src={profileEdit}
                  alt="프로필 편집"
                />
              </div>
            </div>
          </label>

          {/* 모달 */}
          <Modal
            className="profile-modal"
            title="프로필 이미지 변경"
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
          >
            <div className="profile-modal-btn">
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button>앨범에서 이미지 선택</button>
              <button>기본 이미지 설정</button>
              <button onClick={handleModalClose}>취소</button>
            </div>
          </Modal>

          <div className="userEdit-info-container">
            <div>아이디</div>
            <div className="userEdit-email">
              <input className="userEdit" type="text" value={email} readOnly />
            </div>

            <div>
              비밀번호
              <input className="userEdit" type="text" value={email} readOnly />
              <button>비밀번호 변경</button>
            </div>

            <div>닉네임</div>
            <div className="userEdit-nickname">
              <input
                className="userEdit"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div>이름</div>
            <div className="userEdit-name">
              <input className="userEdit" type="text" value={name} readOnly />
            </div>

            <div>출생년도</div>
            <div className="userEdit-birth">
              <input
                className="userEdit"
                type="number"
                value={birth}
                readOnly
              />
            </div>

            <div>전화번호</div>
            <div className="userEdit-phone">
              <input
                className="userEdit"
                type="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSave}>저장하기</button>
        </form>
      </div>
    </MyPageStyled>
  );
};

export default Mypage;
