// useRef는 DOM 요소 참조 / 렌더링이 필요하지 않은 값을 유지할 때 사용
// useState는 UI와 연관된 상태를 관리하고, 상태 변경 시 컴포넌트를 리렌더링하여 업데이트
import { useState, useRef, useEffect } from "react";
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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 모달 열기 / 닫기
  const [password, setPassword] = useState(""); // 새 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 새 비밀번호 확인

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 모달 열기/닫기
  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

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
      // 선택한 파일을 콘솔로 확인
      console.log("선택한 파일:", file);

      // FileReader로 이미지 URL을 읽어 미리보기 설정
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result는 data URL 형태로 이미지 URL을 반환
        setProfileImagePreview(e.target.result as string);
        // console.log("미리보기 URL:", e.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file); // 선택한 파일 저장
      console.log("선택한 파일 객체:", file);
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

  // 비밀번호 변경 모달 열기
  const handlePwOpen = () => {
    setIsPasswordModalOpen(true);
  };

  // 비밀번호 변경 모달 닫기
  const handlePwClose = () => {
    setIsPasswordModalOpen(false);
  };

  const handleChangePassword = async () => {
    if (!password || !passwordCheck) {
      alert("비밀번호를 입력해주세요");
    }

    try {
      const response = await axios.post(`/api/user/password`, {
        data: { password },
      });
      if (response.data.message) {
        alert("비밀번호가 변경되었습니다.");
      } else {
        alert(response.data.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복검사 (axios 요청)
  const handleCheckNickName = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(`/api/user/check-nickname`, {
        params: { nickname },
      });

      if (response.data.exists) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 검사 오류:", error);
      alert("닉네임 중복 검사 중 오류가 발생했습니다.");
    }
  };

  // 저장하기 버튼 클릭 시 axios 업데이트 요청(이미지, 닉네임, 이름, 휴대폰번호)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // const updateUserData = { nickname, name, phoneNumber };

    // FormData 생성
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);

    // 이미지가 선택된 경우에만 추가
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      const response = await axios.put("/api/user/profile", {
        // data: { updateUserData },
        formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("정보 수정 성공:", response.data);
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    // 로그아웃 로직 (쿠키 삭제)
    console.log("로그아웃");
  };

  // 회원 탈퇴 처리
  const handleDelete = async () => {
    // 회원 탈퇴 로직 (API 호출로 계정 삭제)
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
                // src={profileImagePreview || "/default-profile.png"} // 미리보기 이미지 또는 기본 이미지
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
                  // value={password}
                  placeholder="**********"
                  readOnly
                />
                <button
                  className="change-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePwOpen();
                  }}
                >
                  비밀번호 변경
                </button>
              </div>
            </div>

            {/* 비밀번호 변경 모달 */}
            <Modal
              className="password-modal"
              title="비밀번호 변경"
              open={isPasswordModalOpen}
              onCancel={handlePwClose}
              footer={null}
            >
              <div className="password-modal-container">
                <input
                  className="userEdit"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호"
                />
                <input
                  className="userEdit"
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder="새 비밀번호 확인"
                />
                <button onClick={handleChangePassword}>비밀번호 변경</button>
              </div>
            </Modal>

            <div>닉네임</div>
            <div className="userEdit-nickname">
              <input
                className="userEdit"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="double-check" onClick={handleCheckNickName}>
                중복검사
              </button>
              {/* {isNickName && <p>{nickNameSameError}</p>} */}
            </div>

            <div>이름</div>
            <div className="userEdit-name">
              <input
                className="userEdit"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
              <button onClick={handleDelete}>회원탈퇴</button>
            </div>
          </div>
        </form>
      </div>
    </MyPageStyled>
  );
};

export default Mypage;
