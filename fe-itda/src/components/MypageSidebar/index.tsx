import clsx from "clsx";
import { MypageSidebarStyled } from "./styled";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";

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
  const { mode } = router.query;

  // '내 정보 수정' 클릭 → 수정 모드
  const handleEditClick = () => {
    router.push({
      pathname: "/mypage",
      query: { mode: "edit" },
    });
  };

  // '내 프로필' 클릭 → 뷰 모드
  const handleViewClick = () => {
    router.push({
      pathname: "/mypage",
      query: { mode: "view" },
    });
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
          <div
            onClick={handleViewClick}
            className={clsx({ active: mode !== "edit" })}
          >
            내 프로필
          </div>
          <div
            onClick={handleEditClick}
            className={clsx({ active: mode === "edit" })}
          >
            내 정보 수정
          </div>
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
