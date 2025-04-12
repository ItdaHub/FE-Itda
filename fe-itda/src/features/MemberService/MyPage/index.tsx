// useRef는 DOM 요소 참조 / 렌더링이 필요하지 않은 값을 유지할 때 사용
// useState는 UI와 연관된 상태를 관리하고, 상태 변경 시 컴포넌트를 리렌더링하여 업데이트
import { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { MyPageStyled } from "./styled";
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
import { MailOutlined } from "@ant-design/icons";
// import ProfileImg from "@/components/ProfileImg";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockIcon from "@mui/icons-material/Lock";
import TagIcon from "@mui/icons-material/Tag";

const Mypage = () => {
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

      if (user.profile_img) {
        setProfileImagePreview(user.profile_img);
      }
    }
    // if (!user) {
    //   router.replace("/login"); // 로그인 안 되어있으면 로그인 페이지로 이동
    // }
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

      if (nickName === user?.nickname) {
        setNickNameError("현재 사용 중인 닉네임입니다.");
        return;
      }

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
    router.push("/main"); // 메인페이지로 이동
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
            router.push("/main");
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
    <MyPageStyled className={clsx("mypage-wrap")}>
      <div className="mypage-box">
        <div className="mypage-sidebar left">
          <h3>내 정보</h3>

          <div>
            <div className="profile">
              <Image
                src={image ? URL.createObjectURL(image) : profileStactic}
                alt="프로필 사진"
                priority
                width={100}
                height={100}
                className="profile-image"
              />
              <div className="profile-user">
                <div className="user-nick">{nickName}</div>
                <div className="user-email">{email}</div>
              </div>
            </div>

            <div className="profile-title">
              <div>내 프로필</div>
              <div>내 정보 수정</div>
            </div>

            <div className="smartbox">
              <div className="tok">스마트봇 상담</div>
              <div className="tok">회원톡톡</div>
            </div>
            <div
              style={{
                display: "flex",
                padding: 20,
                justifyContent: "center",
                gap: 20,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "gray",
                }}
              >
                로그아웃
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "gray",
                }}
              >
                고객센터
              </button>
            </div>
          </div>
        </div>
        <div className="mypage-info right">
          <form className="subprofile">
            <div className="subprofile-basic">
              <div>기본정보</div>
              {/* 프로필 이미지 */}
              <div className="input-file">
                <div className="userEdit-image" onClick={handleImgModal}>
                  <Image
                    src={image ? URL.createObjectURL(image) : profileStactic}
                    alt="프로필 사진"
                    priority
                    width={60}
                    height={60}
                  />
                </div>
                <div className="profile-user">
                  <div className="user-nick">{nickName}</div>
                  <div className="user-email">{email}</div>
                </div>
              </div>
              <div className="userEdit-name">
                <div className="user-name">
                  <BadgeOutlinedIcon className="custom-icon" />
                  <div className="userEdit">{name}</div>
                </div>
                <div className="user-email2">
                  <EmailOutlinedIcon className="custom-icon" />
                  <div className="userEdit">{email}</div>
                </div>
              </div>
            </div>

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
              <div className="add-title">부가정보</div>
              <div className="subprofile-add">
                {type === "local" && (
                  <div>
                    {/* 비밀번호 */}
                    <div className="change-pass" style={{ display: "flex" }}>
                      <LockIcon className="custom-icon" />
                      <input
                        className="userEdit"
                        type="password"
                        // value={password}
                        placeholder="비밀번호"
                        readOnly
                      />
                      <button
                        className="change-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePwOpen();
                        }}
                      >
                        변경
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
                  <div
                    className="password-modal-container"
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   gap: "20px",
                    // }}
                  >
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

                <div className="userEdit-nickname">
                  <TagIcon className="custom-icon" />
                  <input
                    className="userEdit"
                    type="text"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                  />

                  {/* <button
                    className="double-check"
                    onClick={handleCheckNickName}
                  >
                    중복검사
                  </button> */}
                </div>
                {/* <p
                  className={`error-message ${
                    nickNameError ? "red-text" : "green-text"
                  }`}
                >
                  {nickNameError || nickNameSuccess}
                </p> */}

                {/* 출생년도 */}
                <div className="userEdit-birth">
                  <CakeOutlinedIcon className="custom-icon" />
                  {type === "naver" ? (
                    <span className="userEdit" style={{ paddingLeft: "8px" }}>
                      생일 없음
                    </span>
                  ) : (
                    <input
                      className="userEdit"
                      type="number"
                      value={birth}
                      readOnly
                    />
                  )}
                </div>

                {/* 전화번호 */}
                <div className="userEdit-phone">
                  <PhoneAndroidIcon className="custom-icon" />
                  {type === "local" ? (
                    <input
                      className="userEdit"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      readOnly
                    />
                  ) : (
                    <span className="userEdit" style={{ paddingLeft: "8px" }}>
                      번호 없음
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div
              className="mypage-btn"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <button onClick={handleSave}>저장하기</button> */}

              <button
                type="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "gray",
                }}
              >
                회원탈퇴 {">"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MyPageStyled>
  );
};

export default Mypage;
