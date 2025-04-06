import clsx from "clsx";
import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import nickarrow from "@/assets/images/nick_arrow.svg";
import popcorn from "@/assets/images/popcorn_icon.png";
import comment_icon from "@/assets/images/comment_icon.svg";
import mywrite from "@/assets/images/mywrite_icon.svg";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import {
  ChargeButton,
  DarkModeBox,
  HeaderStyled,
  LogoutText,
  Menus,
  NickBox,
  TopBox,
} from "./styled";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Cookies from "js-cookie";
import { logout } from "@/features/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Switch } from "antd";
import { useEffect, useState } from "react";
import CustomSwitch from "@/components/common/CustomSwitch";
import { toggleTheme } from "@/features/theme/themeSlice";
import api from "@/utill/api";

const Header = () => {
  // 검색 키워드 값 관리
  const [keyword, setKeyword] = useState("");

  // 현재 가지고 있는 팝콘
  const [nowPrice, setNowPrice] = useState(0);

  const [visible, setVisible] = useState(false);
  const router = useRouter();

  // 다크모드 상태 가져오기
  const mode = useAppSelector((state) => state.theme.mode);

  // 로그인된 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  console.log("afdssssssssssssssss", user);
  // 로그아웃
  const handleLogout = () => {
    Cookies.remove("access_token"); // 토큰 제거
    dispatch(logout()); // Redux 상태 초기화
    router.push("/main");
    setVisible(false);
  };

  // 헤더 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
  ];

  // useEffect(() => {
  //   const getCharge = async () => {
  //     try {
  //       const res = await api.get(`/charge/${user?.id}`);
  //       setNowPrice(res.data.nowPrice);
  //     } catch (error) {
  //       console.error("충전 금액 불러오기 실패:", error);
  //     }
  //   };

  //   if (user?.id) {
  //     getCharge();
  //   }
  // }, [user?.id]);

  // 모달 내용
  const content = (
    <div>
      {/* 내정보 */}
      <NickBox>
        연이님{/* <span>{user?.nickname || "사용자"}님</span> */}
        <img src={nickarrow.src} alt="화살표" />
      </NickBox>

      {/* 충전 */}
      <TopBox>
        {nowPrice}
        <ChargeButton>충전</ChargeButton>
      </TopBox>

      {/* 메뉴들 */}
      <Menus>
        <div className="header-">
          <img src={comment_icon.src} alt="댓글" />
          <img src={popcorn.src} alt="팝콘" />
        </div>
        <div>
          <img src={mywrite.src} alt="내글" />
          <HeartOutlined />
        </div>
      </Menus>

      {/* 다크모드 토글 */}
      <DarkModeBox>
        <span>🌙 다크모드</span>
        <CustomSwitch checked={mode === "dark"} onChange={toggleDarkMode} />
      </DarkModeBox>

      {/* 로그아웃 */}
      <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
    </div>
  );

  const isHidden = notPage.includes(router.pathname);

  return (
    <HeaderStyled className={clsx("header-wrap")}>
      <div className={isHidden ? "headerOff" : "header"}>
        {/* 로고 */}
        <div
          className="header-logoBox"
          onClick={() => {
            router.push("/main");
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
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  // router.push("/search");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    keyword.trim() === ""
                      ? alert("검색어를 입력해주세요")
                      : router.push(
                          `/search?keyword=${encodeURIComponent(keyword)}`
                        );
                  }
                }}
              />
            </div>

            <div
              className="header-searchImg"
              onClick={() => {
                keyword.trim() === ""
                  ? alert("검색어를 입력해주세요")
                  : router.push(
                      `/search?keyword=${encodeURIComponent(keyword)}`
                    );
              }}
            >
              <Image src={search} alt="search" />
            </div>
          </div>

          {/* 공지사항 */}
          <div className="header-louder">
            <Image
              src={louder}
              alt="louder"
              onClick={() => {
                router.push("/notice");
              }}
            />
          </div>

          {/* 알림 */}
          <div className="header-alram">
            <Image
              src={alram}
              alt="alram"
              onClick={() => {
                router.push("/alert");
              }}
            />
          </div>

          {/* 로그인 or 프로필 */}
          {/* $$이거 !빼야함!!!!!!!!!!!!!!!!!!!! */}
          {!user ? (
            <Popover
              content={content}
              trigger="click"
              placement="bottomRight" // 클릭한 곳의 아래 오른쪽에 배치
            >
              <div className="header-profile" style={{ cursor: "pointer" }}>
                <Avatar size="small" icon={<UserOutlined />} />
              </div>
            </Popover>
          ) : (
            <div className="header-login" onClick={() => router.push("/login")}>
              <Image src={login} alt="login" />
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
