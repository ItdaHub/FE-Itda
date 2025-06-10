import {
  HomeOutlined,
  BellOutlined, // 알림
  NotificationOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { MoblieNav } from "./styled";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

// 모바일 네비게이션바
const MobileNav = () => {
  const router = useRouter();

  if (router.pathname === "/chapter/[id]") return;

  const user = useAppSelector((state) => state.auth.user);

  return (
    <MoblieNav className={clsx("moblie-wrap")}>
      {/* 홈 */}
      <Link href="/">
        <HomeOutlined />
      </Link>
      {/* 알림 */}
      <Link href="/alert">
        <BellOutlined />
      </Link>
      {/* 공지사항 */}
      <Link href="/notice">
        <NotificationOutlined />
      </Link>
      {/* 찜 */}
      <Link href="/myfavorite">
        <HeartOutlined />
      </Link>
      {/* 마이페이지 */}
      <Link href={user ? "/mypage" : "/login"}>
        <UserOutlined />
      </Link>
    </MoblieNav>
  );
};

export default MobileNav;
