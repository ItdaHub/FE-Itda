import { Modal } from "antd";
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
import { useState } from "react";
import api from "@/utill/api";
import {
  changePassword,
  validationPass,
  validationPassCheck,
} from "@/utill/vali";
import Swal from "sweetalert2";

interface MypageViewProps {
  image: File | null;
  profileStactic: string;
  nickName: string;
  setNickName: (value: string) => void;
  email: string;
  name: string;
  type: string;
  birth: string;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

const MypageView = ({
  image,
  profileStactic,
  nickName,
  setNickName,
  email,
  name,
  type,
  birth,
  phoneNumber,
  setPhoneNumber,
}: MypageViewProps) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 모달 열기 / 닫기
  const [password, setPassword] = useState(""); // 새 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 새 비밀번호 확인
  // 새 비밀번호 에러 메세지
  const [passError, setPassError] = useState("");
  // 새 비밀번호 확인 에러 메세지
  const [passCheckError, setPassCheckError] = useState("");
  // 비밀번호 변경 axios 요청 에러 메세지
  const [changePwError, setChangePwError] = useState("");

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
    <MypageViewStyled className={clsx("mypage-info", "right")}>
      <form className="subprofile">
        <div className="subprofile-basic">
          <div>기본정보</div>
          <ProfileImage
            image={image}
            profileStatic={profileStactic}
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
                <div className="change-pass" style={{ display: "flex" }}>
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
            </StyledModal>

            <div className="userEdit-nickname">
              <TagIcon className="custom-icon" />
              <input
                className="userEdit"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>

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
          <button
            type="button"
            onClick={handleDelete}
            className="exit-user"
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
    </MypageViewStyled>
  );
};

export default MypageView;
