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
import alarm from "@/assets/images/alram.svg";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const MobileNav = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <MoblieNav className={clsx("moblie-wrap")}>
      <Link href="/">
        <HomeOutlined />
      </Link>
      <Link href="/alert">
        <BellOutlined />
      </Link>
      <Link href="/notice">
        <NotificationOutlined />
      </Link>
      <Link href="/myfavorite">
        <HeartOutlined />
      </Link>

      <Link href={user ? "/mypage" : "/login"}>
        <UserOutlined />
      </Link>
    </MoblieNav>
  );
};

export default MobileNav;
