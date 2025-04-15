// useRef는 DOM 요소 참조 / 렌더링이 필요하지 않은 값을 유지할 때 사용
// useState는 UI와 연관된 상태를 관리하고, 상태 변경 시 컴포넌트를 리렌더링하여 업데이트
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import Image from "next/image";

import profileStactic from "@/assets/images/img_profile_static.svg";
import profileEdit from "@/assets/images/img_profile_edit.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/features/auth/logout";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  changePassword,
  validationPass,
  validationPassCheck,
} from "@/utill/vali"; // 비밀번호 변경 요청
import api from "@/utill/api";
import Swal from "sweetalert2";
import { MyIDStyled } from "./styled";

const MyID = () => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("현재 유저 정보 확인 👉", user);
      setEmail(user.email);
      setNickName(user.nickname);
      setName(user.name);
      setType(user.type);
      setBirth(user.birthYear);
      setPhoneNumber(user.phone);

      console.log(user.type, "??");
      if (user.profile_img) {
        setProfileImagePreview(user.profile_img);
      }
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("local");
  const [birth, setBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 모달 열기 / 닫기
  const [password, setPassword] = useState(""); // 새 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 새 비밀번호 확인
  // 새 비밀번호 에러 메세지
  const [passError, setPassError] = useState("");
  // 새 비밀번호 확인 에러 메세지
  const [passCheckError, setPassCheckError] = useState("");
  // 비밀번호 변경 axios 요청 에러 메세지
  const [changePwError, setChangePwError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 모달 열기/닫기
  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  // 중복 검사 상태를 관리할 state
  const [isNickName, setIsNickName] = useState<boolean>(false);
  // 닉네임의 유효성 검사 상태
  const [nickNameError, setNickNameError] = useState("");
  // 닉네임 중복 검사 상태 메세지
  const [nickNameSuccess, setNickNameSuccess] = useState("");

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

  // const handleChangePw = async () => {
  //   if (!password || !passwordCheck) {
  //     alert("비밀번호를 입력해주세요");
  //   }

  //   try {
  //     const response = await axios.post(`/api/user/password`, {
  //       data: { password },
  //     });
  //     if (response.data.message) {
  //       alert("비밀번호가 변경되었습니다.");
  //     } else {
  //       alert(response.data.message || "비밀번호 변경에 실패했습니다.");
  //     }
  //   } catch (error) {
  //     console.error("비밀번호 변경 오류:", error);
  //     alert("비밀번호 변경 중 오류가 발생했습니다.");
  //   }
  // };

  // 비밀번호 변경 버튼 클릭 (axios 요청 => util/vali에서 처리)
  const handleChangePw = (e: React.MouseEvent) => {
    e.preventDefault();
    changePassword(email, password, passwordCheck, setChangePwError);
  };

  const handleCheckNickName = async (e: any) => {
    e.preventDefault();

    // 유효성 검사
    if (!nickName.trim()) {
      setNickNameError("닉네임을 입력해주세요.");
      return;
    }

    const isValid = nickName.length >= 2 && nickName.length <= 8;
    if (!isValid) {
      setNickNameError("닉네임은 2~8자 사이여야 합니다.");
      return;
    }

    // 닉네임 중복 axios 요청 (현재 사용중인 닉네임 예외처리)
    try {
      const res = await api.post("/auth/nicknameCheck/edit", { nickName });

      setIsNickName(true);
      setNickNameError("");
      setNickNameSuccess(res.data.message);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "닉네임 중복 확인 중 오류가 발생했습니다.";
      setIsNickName(false);
      setNickNameError(message);
      setNickNameSuccess("");
    }
  };

  // 저장하기 버튼 클릭 시 axios 업데이트 요청(이미지, 닉네임, 이름, 휴대폰번호)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // const updateUserData = { nickname, name, phoneNumber };

    // FormData 생성
    const formData = new FormData();
    formData.append("nickname", nickName);
    // formData.append("name", name);
    // formData.append("phoneNumber", phoneNumber);

    // 이미지가 선택된 경우에만 추가
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      const response = await api.put(
        "/auth/edit",
        // data: { updateUserData },
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
    dispatch(logoutUser()); // 서버 요청 + 상태 초기화
    router.push("/"); // 메인페이지로 이동
    console.log("로그아웃");
  };

  // 회원 탈퇴 처리
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      text: "탈퇴 후 서비스 이용을 하실 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 회원 탈퇴 로직 (API 호출로 계정 삭제)
        try {
          const response = await api.delete(`/auth/deleteId/${email}`);

          if (response.status === 200) {
            Swal.fire({
              title: "탈퇴가 완료되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
            });
            dispatch(logoutUser());
            router.push("/");
          } else {
            alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("회원 탈퇴 중 오류 발생:", error);
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    });
  };

  return (
    <MyIDStyled className={clsx("my-page")}>
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
            // title="프로필 이미지 변경"
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
                <button onClick={handleSetDefaultImage}>
                  기본 이미지 설정
                </button>
                <button onClick={handleModalClose}>취소</button>
              </div>
            </div>
          </Modal>

          <div className="userEdit-info-container">
            {/* 이메일 */}
            <div>아이디</div>
            <div className="userEdit-email">
              <input className="userEdit" type="text" value={email} readOnly />
            </div>

            {/* 비밀번호 */}
            {type === "local" && (
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
            )}

            {/* 비밀번호 변경 모달 */}
            <Modal
              className="password-modal"
              title="비밀번호 변경"
              open={isPasswordModalOpen}
              onCancel={handlePwClose}
              footer={null}
              centered
            >
              <div className="password-modal-container">
                <input
                  className="userEdit"
                  type="password"
                  value={password}
                  placeholder="새 비밀번호"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validationPass(e.target.value, setPassError);
                  }}
                />
                {passError && (
                  <p className="findpw-errorMessage">{passError}</p>
                )}
                <input
                  className="userEdit"
                  type="password"
                  value={passwordCheck}
                  placeholder="새 비밀번호 확인"
                  onChange={(e) => {
                    setPasswordCheck(e.target.value);
                    validationPassCheck(
                      e.target.value,
                      password,
                      setPassCheckError
                    );
                  }}
                />
                {passCheckError && (
                  <p className="findpw-errorMessage">{passCheckError}</p>
                )}
                <button onClick={handleChangePw}>비밀번호 변경</button>
                {changePwError && (
                  <p className="findpw-errorMessage">{changePwError}</p>
                )}
              </div>
            </Modal>
            <div>닉네임</div>
            <div className="userEdit-nickname">
              <input
                className="userEdit"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              {/* </div> */}
              <button className="double-check" onClick={handleCheckNickName}>
                중복검사
              </button>
            </div>
            <p
              className={`error-message ${
                nickNameError ? "red-text" : "green-text"
              }`}
            >
              {nickNameError || nickNameSuccess}
            </p>
            <div>이름</div>
            <div className="userEdit-name">
              <input
                className="userEdit"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                readOnly
              />
            </div>

            {/* 출생년도 */}
            {type !== "naver" && (
              <>
                <div>출생년도</div>
                <div className="userEdit-birth">
                  <input
                    className="userEdit"
                    type="number"
                    value={birth}
                    readOnly
                  />
                </div>
              </>
            )}

            {/* 전화번호 */}
            {type === "local" && (
              <>
                <div>전화번호</div>
                <div className="userEdit-phone">
                  <input
                    className="userEdit"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    readOnly
                  />
                </div>
              </>
            )}
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
    </MyIDStyled>
  );
};

export default MyID;
