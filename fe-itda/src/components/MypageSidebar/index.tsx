import clsx from "clsx";
import { MypageSidebarStyled } from "./styled";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MypageSidebarProps {
  profileStatic: string;
  nickName: string;
  email: string;
  handleLogout: () => void;
}

const MypageSidebar = ({
  profileStatic,
  nickName,
  email,
  handleLogout,
}: MypageSidebarProps) => {
  const router = useRouter();
  const { tab } = router.query;

  // 선택한 버튼의 효과 관리
  const [clickButton, setClickButton] = useState("profile");

  useEffect(() => {
    if (tab === "profile") {
      setClickButton("profile");
    } else if (tab === "edit") {
      setClickButton("edit");
    } else if (tab === "submission") {
      setClickButton("submission");
    } else if (tab === "readnovels") {
      setClickButton("readnovels");
    }
  }, [tab]);

  const tabList = [
    { key: "profile", label: "개인정보" },
    { key: "edit", label: "프로필 수정" },
    { key: "submission", label: "내 출품작" },
    { key: "readnovels", label: "최근 본 소설" },
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
          profileStatic={profileStatic}
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
        </div>
      </div>
    </MypageSidebarStyled>
  );
};

export default MypageSidebar;
