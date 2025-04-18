import { message, Modal } from "antd";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import TagIcon from "@mui/icons-material/Tag";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import clsx from "clsx";
import { MypageViewStyled, StyledModal } from "./styled";
import ProfileImage from "@/components/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/features/auth/logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import {
  changePassword,
  validationPass,
  validationPassCheck,
} from "@/utill/vali";
import Swal from "sweetalert2";

interface MypageViewProps {
  image: File | null;
  profileStatic: string;
  nickName: string;
  email: string;
  name: string;
  type: string;
  birth: string;
  phoneNumber: string;
}

const MypageView = ({
  image,
  profileStatic,
  nickName,
  email,
  name,
  type,
  birth,
  phoneNumber,
}: MypageViewProps) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (phoneNumber) {
      setEditPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 모달 열기 / 닫기
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  // 비밀번호 변경 axios 요청 에러 메세지
  const [changePwError, setChangePwError] = useState("");

  const [editPhoneNumber, setEditPhoneNumber] = useState(phoneNumber || ""); // 전화번호 없으면 빈 문자열
  const [isEditingPhone, setIsEditingPhone] = useState(false); // 수정 / 저장 토글

  // 전화번호 자동 하이픈(-) 생성
  const formatPhoneNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    if (number.length <= 3) return number;
    if (number.length <= 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
    return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7, 11)}`;
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setEditPhoneNumber(formatted);
  };

  // 전화번호 저장 시
  const handlePhoneSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    if (!editPhoneNumber) {
      message.warning("휴대폰번호를 입력해주세요.");
      return;
    } else if (!phoneRegex.test(editPhoneNumber)) {
      message.warning("올바른 휴대폰번호를 입력해주세요. (예: 010-1234-5678)");
      return;
    }

    try {
      await api.patch("/users/phone", { phoneNumber: editPhoneNumber });
      setIsEditingPhone(false);
      message.success("전화번호가 저장되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("전화번호 저장에 실패했습니다.");
    }
  };

  const handlePhoneEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditingPhone(true);
  };

  // 입력, 메세지 초기화
  const resetPasswordModal = () => {
    setPassword("");
    setPasswordCheck("");
    setPassError("");
    setPassCheckError("");
    setChangePwError("");
  };

  // 비밀번호 변경 모달 열기
  const handlePwOpen = () => {
    resetPasswordModal();
    setIsPasswordModalOpen(true);
  };

  // 비밀번호 변경 모달 닫기
  const handlePwClose = () => {
    setIsPasswordModalOpen(false);
    resetPasswordModal();
  };

  // 비밀번호 변경 버튼 클릭 (axios 요청 => util/vali에서 처리)
  const handleChangePw = (e: React.MouseEvent) => {
    e.preventDefault();
    changePassword(email, password, passwordCheck, setChangePwError);
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
          const response = await api.delete("/users/me");
          if (response.status === 204) {
            Swal.fire({
              title: "탈퇴가 완료되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
            });
            dispatch(logoutUser());
            router.push("/");
          } else {
            message.error("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("회원 탈퇴 중 오류 발생:", error);
          message.error("오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    });
  };

  return (
    <MypageViewStyled className={clsx("mypage-info", "right")}>
      <form className="subprofile">
        <div className="subprofile-basic">
          <div>기본정보</div>
          <ProfileImage
            profileStatic={profileStatic}
            nickName={nickName}
            email={email}
            type="contain"
          />
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

        <div className="userEdit-info-container">
          <div className="add-title">부가정보</div>
          <div className="subprofile-add">
            {type === "local" && (
              <div className="userEdit-password">
                <div className="change-pass">
                  <LockIcon className="custom-icon" />
                  <input
                    className="userEdit"
                    type="password"
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
                    수정
                  </button>
                </div>
              </div>
            )}

            {/* 비밀번호 변경 모달 */}
            <StyledModal
              className="password-modal"
              title="비밀번호 변경"
              open={isPasswordModalOpen}
              onCancel={handlePwClose}
              footer={null}
              centered
              width={450}
            >
              <div className="password-modal-container">
                <div className="pass-wrap">
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
                    <p className="findpw-errorMessage">{passError || "⠀"}</p>
                  )}
                </div>
                <div className="pass-wrap">
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
                </div>
                <div>
                  <button onClick={handleChangePw}>비밀번호 변경</button>
                  {changePwError && (
                    <p className="findpw-errorMessage">{changePwError}</p>
                  )}
                </div>
              </div>
            </StyledModal>

            <div className="userEdit-nickname">
              <TagIcon className="custom-icon" />
              <input
                className="userEdit"
                type="text"
                value={nickName}
                readOnly
              />
            </div>

            {/* 출생년도 */}
            <div className="userEdit-birth">
              <CakeOutlinedIcon className="custom-icon" />
              {type === "naver" ? (
                <span className="userEdit">생일 없음</span>
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
              {editPhoneNumber || isEditingPhone ? (
                <>
                  <input
                    className="userEdit"
                    type="tel"
                    value={editPhoneNumber}
                    readOnly={!isEditingPhone}
                    onChange={handlePhoneInputChange}
                    placeholder="010-1234-5678"
                  />
                  {isEditingPhone ? (
                    <button
                      className="change-btn"
                      onClick={handlePhoneSaveClick}
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      className="change-btn"
                      onClick={handlePhoneEditClick}
                    >
                      수정
                    </button>
                  )}
                </>
              ) : (
                <>
                  <span className="userEdit">번호 없음</span>
                  <button className="change-btn" onClick={handlePhoneEditClick}>
                    수정
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mypage-btn">
          <button type="button" onClick={handleDelete} className="exit-user">
            회원탈퇴 {">"}
          </button>
        </div>
      </form>
    </MypageViewStyled>
  );
};

export default MypageView;
