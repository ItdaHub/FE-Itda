import clsx from "clsx";

import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
// import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Header = () => {
  const router = useRouter();

  // const { data: session } = useSession();
  // const user = useSelector((state: RootState) => state.user);

  // 헤더 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
  ];

  return (
    <HeaderStyled className={clsx("header-wrap")}>
      <div
        className={
          notPage.filter((url) => router.pathname === url).length !== 0
            ? "headerOff"
            : "header"
        }
      >
        {/* {session ? (
          <div>
            <img src={user.image} alt="User Profile" />
            <span>{user.name}</span>
          </div>
        ) : (
          <> */}
        {/* 로고 */}
        <div
          className="header-logoBox"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image className="header-logo" src={logo} alt="logo" />
        </div>
        {/* 헤더 메뉴 */}
        <div className="header-menu">
          {/* 검색 */}
          <div className="header-searchBox">
            <div className="header-searchText">
              <input
                className="header-Text"
                type="text"
                placeholder="제목을 입력하세요"
              />
            </div>

            <div className="header-searchImg">
              <Image src={search} alt="search" />
            </div>
          </div>

          {/* 공지사항 */}
          <div className="header-louder">
            <Image src={louder} alt="louder" />
          </div>

          {/* 알림 */}
          <div className="header-alram">
            <Image src={alram} alt="alram" />
          </div>

          {/* 로그인 */}
          <div className="header-login">
            <Image
              src={login}
              alt="login"
              onClick={() => {
                router.push("/login");
              }}
            />
          </div>
        </div>
        {/* </> */}
        {/* ) */}
      </div>
    </HeaderStyled>
  );
};

export default Header;
