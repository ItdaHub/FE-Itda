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
  const { tab } = router.query;

  // Tab 클릭별 쿼리 이동
  const handleTabClick = (tabName: string) => {
    router.push({
      pathname: "/mypage",
      query: { tab: tabName },
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
            onClick={() => handleTabClick("profile")}
            // className={clsx({ active: tab === "profile" })}
          >
            내 프로필
          </div>
          <div
            onClick={() => handleTabClick("edit")}
            // className={clsx({ active: tab === "edit" })}
          >
            내 정보 수정
          </div>
          <div
            onClick={() => handleTabClick("product")}
            // className={clsx({ active: tab === "products" })}
          >
            출품작
          </div>
          <div
            onClick={() => handleTabClick("revenue")}
            // className={clsx({ active: tab === "revenue" })}
          >
            수익 관리
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
