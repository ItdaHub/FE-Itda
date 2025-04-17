import clsx from "clsx";
import { MypageSidebarStyled } from "./styled";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MypageSidebarProps {
  image: File | null;
  profileStactic: string;
  nickName: string;
  email: string;
  handleLogout: () => void;
}

const MypageSidebar = ({
  image,
  profileStactic,
  nickName,
  email,
  handleLogout,
}: MypageSidebarProps) => {
  const router = useRouter();
  const { tab } = router.query;

  // 선택한 버튼의 효과 관리
  const [clickButton, setClickButton] = useState("profile");

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

  return (
    <MypageSidebarStyled className={clsx("mypage-sidebar", "left")}>
      <h3>내 정보</h3>
      <div>
        {/* 내정보 sidebar 프로필 이미지 */}
        <ProfileImage
          image={image}
          profileStatic={profileStactic}
          nickName={nickName}
          email={email}
          type="sidebar"
        />

        <div className="profile-title">
          {tabList.map(({ key, label }) => (
            <div
              key={key}
              className={clickButton === key ? "active" : ""}
              onClick={() => handleButtonClick(key)}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="logout">
          <button
            type="button"
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "gray",
              cursor: "pointer",
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
    </MypageSidebarStyled>
  );
};

export default MypageSidebar;
