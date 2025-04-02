// import MyDocument from "@/pages/_document";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { MyPageStyled } from "./styled";
// import clsx from "clsx";
// import Image from "next/image";
// // 프로필 이미지 기본 이미지
// import profileStactic from "@/assets/images/img_profile_static.svg";
// // 프로필 이미지 편집 버튼
// import profileEdit from "@/assets/images/img_profile_edit.svg";
// import { Modal } from "antd";

// const Mypage = () => {
//   const [email, setEmail] = useState(); // 기본 값은 데이터베이스에서 받아옴
//   const [nickname, setNickname] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
//   const [name, setName] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
//   const [birth, setBirth] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴
//   const [phoneNumber, setPhoneNumber] = useState<string>(); // 기본 값은 데이터베이스에서 받아옴

//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");

//   const [profileDefaultImg, setProfileDefaultImg] = useState("profileStactic");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   // const [imageUrl, setImageUrl] = useState<string | null>("profileStactic"); // Store image URL (for display)
//   // `fileInputRef`의 타입을 HTMLInputElement로 설정
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // 모달 토글 함수
//   const handleImgModal = () => {
//     setIsModalOpen(true);
//   };

//   // 이미지 선택 핸들러
//   // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = event.target.files?.[0];
//   //   if (file) {
//   //     setImage(file);
//   //     setIsModalOpen(false); // 파일 선택 후 모달 닫기
//   //   }
//   // setImage(URL.createObjectURL(file));
//   // };

//   // 파일 선택 후 미리보기 업데이트
//   const handleImageChange = (event: any) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         // setImagePreview(e.target.result); // 미리보기 업데이트
//         // setImageUrl;
//         // setSelectedFile(file); // 선택한 파일 저장
//         setImage(file);
//       };
//       reader.readAsDataURL(file);
//     }
//     setIsModalOpen(false); // 파일 선택 후 모달 닫기
//   };

//   // 앨범에서 이미지 선택 버튼 클릭 시 파일 선택 창 띄우기
//   const handleImageSelectFromAlbum = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); // Trigger file input click event
//     }
//     // setIsModalOpen(false
//     // );
//   };
//   // 기본 이미지로 설정하는 함수
//   const handleSetDefaultImage = () => {
//     setImage(null); // 이미지 상태를 기본 이미지로 리셋
//     // setImageUrl(profileStactic); // Set image URL back to default static profile image
//     setIsModalOpen(false); // Close modal
//   };

//   // 모달 닫기 핸들러
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   // 저장하기 버튼 클릭 시 업데이트 요청(닉네임,이름,휴대폰번호)
//   const handleSave = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     const updateUserData = { nickname, name, phoneNumber };
//     try {
//       const response = await axios.put("/api/user/profile", {
//         data: { updateUserData },
//       });
//       console.log("정보 수정 성공:", response.data);
//       alert("정보가 수정되었습니다.");
//     } catch (error) {
//       console.error("정보 수정 실패:", error);
//       alert("정보 수정 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <MyPageStyled className={clsx("my-page")}>
//       <div className="mypage-box">
//         <h3>내 정보 수정</h3>
//         <form className="user-edit">
//           {/* 프로필 이미지 */}
//           <label htmlFor="input-file">
//             <div className="userEdit-image" onClick={handleImgModal}>
//               <Image
//                 src={profileStactic}
//                 // src={}
//                 alt="프로필 사진"
//                 priority
//               />
//               <div className="edit-icon">
//                 <Image
//                   className="edit-profile"
//                   src={profileEdit}
//                   alt="프로필 편집"
//                 />
//               </div>
//             </div>
//           </label>

//           {/* 모달 */}
//           <Modal
//             className="profile-modal"
//             title="프로필 이미지 변경"
//             open={isModalOpen}
//             onCancel={handleModalClose}
//             footer={null}
//           >
//             <div className="profile-modal-btn">
//               <button onClick={handleImageSelectFromAlbum}>
//                 앨범에서 이미지 선택
//               </button>
//               {/* 파일 input (숨겨진 상태) */}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 style={{ display: "none" }} // 기본적으로 숨기기
//                 onChange={handleImageChange} // 파일 선택 시 핸들러 호출
//               />
//               <button onChange={handleSetDefaultImage}>기본 이미지 설정</button>
//               <button onClick={handleModalClose}>취소</button>
//             </div>
//           </Modal>

//           <div className="userEdit-info-container">
//             <div>아이디</div>
//             <div className="userEdit-email">
//               <input className="userEdit" type="text" value={email} readOnly />
//             </div>

//             <div>
//               비밀번호
//               <div className="change-pass">
//                 <input
//                   className="userEdit"
//                   type="text"
//                   value={email}
//                   readOnly
//                 />
//                 <button className="change-btn">비밀번호 변경</button>
//               </div>
//             </div>

//             <div>닉네임</div>
//             <div className="userEdit-nickname">
//               <input
//                 className="userEdit"
//                 type="text"
//                 value={nickname}
//                 onChange={(e) => setNickname(e.target.value)}
//               />
//               <button className="double-check">중복검사</button>
//             </div>

//             <div>이름</div>
//             <div className="userEdit-name">
//               <input className="userEdit" type="text" value={name} readOnly />
//             </div>

//             <div>출생년도</div>
//             <div className="userEdit-birth">
//               <input
//                 className="userEdit"
//                 type="number"
//                 value={birth}
//                 readOnly
//               />
//             </div>

//             <div>전화번호</div>
//             <div className="userEdit-phone">
//               <input
//                 className="userEdit"
//                 type="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>
//           </div>

//           <div
//             className="mypage-btn"
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <button onClick={handleSave}>저장하기</button>
//             <div style={{ display: "flex" }}>
//               <button onClick={handleSave}>로그아웃</button>
//               <button onClick={handleSave}>회원탈퇴</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </MyPageStyled>
//   );
// };

// export default Mypage;

import { useState, useRef } from "react";
import axios from "axios";
import { Modal } from "antd";
import Image from "next/image";
import { MyPageStyled } from "./styled";
import profileStactic from "@/assets/images/img_profile_static.svg";
import profileEdit from "@/assets/images/img_profile_edit.svg";

const Mypage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인 상태
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(""); // 새 비밀번호 확인 상태

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 이미지 변경 모달 상태
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 변경 모달 상태
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 프로필 이미지 변경 모달 열기
  const handleImgModal = () => {
    setIsModalOpen(true);
  };

  // 이미지 선택 핸들러
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
    setIsModalOpen(false); // 파일 선택 후 모달 닫기
  };

  // 앨범에서 이미지 선택 버튼 클릭 시 파일 선택 창 띄우기
  const handleImageSelectFromAlbum = () => {
    fileInputRef.current?.click();
  };

  // 기본 이미지로 설정하는 함수
  const handleSetDefaultImage = () => {
    setImage(null); // 이미지 상태를 기본 이미지로 리셋
    setIsModalOpen(false); // Close modal
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsPasswordModalOpen(false); // 비밀번호 변경 모달 닫기
  };

  // 저장하기 버튼 클릭 시 업데이트 요청(닉네임, 이름, 휴대폰번호)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateUserData = { nickname, name, phoneNumber };
    try {
      const response = await axios.put("/api/user/profile", {
        data: { updateUserData },
      });
      console.log("정보 수정 성공:", response.data);
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 변경 모달 열기
  const handlePasswordChangeModalOpen = () => {
    setIsPasswordModalOpen(true);
  };

  // 새 비밀번호 변경 핸들러
  const handleChangePassword = async () => {
    if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      // 비밀번호 변경 API 호출
      const response = await axios.put("/api/user/change-password", {
        newPassword,
      });
      console.log("비밀번호 변경 성공:", response.data);
      alert("비밀번호가 변경되었습니다.");
      handleModalClose(); // 모달 닫기
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    // 로그아웃 로직 (예: 쿠키 삭제, 세션 종료 등)
    console.log("로그아웃");
  };

  // 회원 탈퇴 처리 함수
  const handleDeleteAccount = async () => {
    // 회원 탈퇴 로직 (예: API 호출로 계정 삭제)
    console.log("회원 탈퇴");
  };

  return (
    <MyPageStyled className="my-page">
      <div className="mypage-box">
        <h3>내 정보 수정</h3>
        <form className="user-edit">
          {/* 프로필 이미지 */}
          <label htmlFor="input-file">
            <div className="userEdit-image" onClick={handleImgModal}>
              <Image
                src={image ? URL.createObjectURL(image) : profileStactic}
                alt="프로필 사진"
                priority
              />
              <div className="edit-icon">
                <Image
                  className="edit-profile"
                  src={profileEdit}
                  alt="프로필 편집"
                />
              </div>
            </div>
          </label>

          {/* 프로필 이미지 변경 모달 */}
          <Modal
            className="profile-modal"
            title="프로필 이미지 변경"
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
          >
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
          </Modal>

          {/* 비밀번호 변경 모달 */}
          <Modal
            className="password-modal"
            title="비밀번호 변경"
            open={isPasswordModalOpen}
            onCancel={handleModalClose}
            footer={null}
          >
            <div className="password-modal-container">
              <input
                className="userEdit"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
              />
              <input
                className="userEdit"
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="새 비밀번호 확인"
              />
              <button onClick={handleChangePassword}>비밀번호 변경</button>
            </div>
          </Modal>

          <div className="userEdit-info-container">
            <div>아이디</div>
            <div className="userEdit-email">
              <input className="userEdit" type="text" value={email} readOnly />
            </div>

            <div>
              비밀번호
              <div className="change-pass">
                <input
                  className="userEdit"
                  type="text"
                  value={email}
                  readOnly
                />
                <button className="change-btn">비밀번호 변경</button>
              </div>
            </div>

            <div>닉네임</div>
            <div className="userEdit-nickname">
              <input
                className="userEdit"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="double-check">중복검사</button>
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

          <div
            className="mypage-btn"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button onClick={handleSave}>저장하기</button>
            <div style={{ display: "flex" }}>
              <button onClick={handleLogout}>로그아웃</button>
              <button onClick={handleDeleteAccount}>회원탈퇴</button>
            </div>
          </div>
        </form>
      </div>
    </MyPageStyled>
  );
};

export default Mypage;
