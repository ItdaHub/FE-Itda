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
import router, { useRouter } from "next/router";
import clsx from "clsx";

import api from "@/utill/api";
import Swal from "sweetalert2";
// import ProfileImg from "@/components/ProfileImg";
import ProfileImage from "@/components/ProfileImage";
import MypageSidebar from "@/components/MypageSidebar";
import MypageView from "@/features/MypageView";
import MypageEdit from "@/features/MypageEdit";

const Mypage = () => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mode } = router.query || "view";

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // 로그인 안 되어있으면 로그인 페이지로 이동
    } else {
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
  }, [user, router]);

  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("local");
  const [birth, setBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 모달 열기/닫기
  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  // 선택한 버튼의 효과 관리
  const [clickButton, setClickButton] = useState("profile");

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (mode === "edit") {
      setClickButton("edit");
    } else {
      setClickButton("profile");
    }
  }, [mode]);

  const handleButtonClick = (buttonName: string) => {
    setClickButton(buttonName);
    router.push(`/mypage?mode=${buttonName === "profile" ? "view" : "edit"}`);
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
    <MyPageStyled className={clsx("mypage-wrap")}>
      {/* 768px 이하에서만 보일 상단 버튼 */}
      <div className="mobile-profile-menu">
        <button
          className={clickButton === "profile" ? "active" : ""}
          onClick={() => {
            handleButtonClick("profile");
          }}
        >
          내 프로필
        </button>
        <button
          className={clickButton === "edit" ? "active" : ""}
          onClick={() => {
            handleButtonClick("edit");
          }}
        >
          내 정보 수정
        </button>
      </div>

      <div className="mypage-box">
        <MypageSidebar
          image={image}
          profileStactic={profileStactic}
          nickName={nickName}
          email={email}
          handleLogout={handleLogout}
        />

        {mode === "edit" ? (
          <MypageEdit currentNickname={nickName} />
        ) : (
          <MypageView
            image={image}
            profileStactic={profileStactic}
            nickName={nickName}
            setNickName={setNickName}
            email={email}
            name={name}
            type={type}
            birth={birth}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        )}
      </div>
    </MyPageStyled>
  );
};

export default Mypage;
