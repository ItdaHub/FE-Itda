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

const MobileNav = () => {
  return (
    <MoblieNav className={clsx("moblie-wrap")}>
      <Link href="/main">
        <HomeOutlined />
      </Link>
      <Link href="/alert">
        <BellOutlined />
      </Link>
      <Link href="/notice">
        <NotificationOutlined />
      </Link>
      <Link href="/mylike">
        <HeartOutlined />
      </Link>
      <Link href="/mypage">
        <UserOutlined />
      </Link>
    </MoblieNav>
  );
};

export default MobileNav;
