// useRef는 DOM 요소 참조 / 렌더링이 필요하지 않은 값을 유지할 때 사용
// useState는 UI와 연관된 상태를 관리하고, 상태 변경 시 컴포넌트를 리렌더링하여 업데이트
import { useState, useEffect } from "react";
import clsx from "clsx";
import { MyPageStyled } from "./styled";
import profileStactic from "@/assets/images/img_profile_static.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/features/auth/logout";
import { useRouter } from "next/router";

import MypageSidebar from "@/components/MypageSidebar";
import MypageView from "@/features/MypageView";
import MypageEdit from "@/features/MypageEdit";
import MypageProduct from "@/features/MypageProduct";
import MypageRevenue from "@/features/MypageRevenue";

const Mypage = () => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tab } = router.query || "profile";

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
  }, [user]);

  useEffect(() => {
    console.log(clickButton, "기본값");
    if (tab === "profile") {
      setClickButton("profile");
    } else if (tab === "edit") {
      setClickButton("edit");
    } else if (tab === "product") {
      setClickButton("product");
    } else if (tab === "revenue") {
      setClickButton("revenue");
    } else {
      setClickButton("profile");
    }
  }, [tab]);

  const tabList = [
    { key: "profile", label: "내 프로필" },
    { key: "edit", label: "내 정보 수정" },
    { key: "product", label: "출품작" },
    { key: "revenue", label: "수익관리" },
  ];

  const handleButtonClick = (buttonName: string) => {
    setClickButton(buttonName);
    router.push(`/mypage?tab=${buttonName}`);
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    // 로그아웃 로직 (쿠키 삭제)
    dispatch(logoutUser()); // 서버 요청 + 상태 초기화
    alert("로그아웃되었습니다!");
    router.push("/"); // 메인페이지로 이동
    console.log("로그아웃");
  };

  return (
    <MyPageStyled className={clsx("mypage-wrap")}>
      {/* 768px 이하에서만 보일 상단 버튼 */}
      <div className="mobile-profile-menu">
        {tabList.map(({ key, label }) => (
          <button
            key={key}
            className={clickButton === key ? "active" : ""}
            onClick={() => handleButtonClick(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mypage-box">
        {/* 왼쪽 사이드 바 */}
        <MypageSidebar
          image={image}
          profileStactic={profileStactic}
          nickName={nickName}
          email={email}
          handleLogout={handleLogout}
        />

        {tab === "edit" ? (
          <MypageEdit currentNickname={nickName} />
        ) : tab === "product" ? (
          <MypageProduct />
        ) : tab === "revenue" ? (
          <MypageRevenue />
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
