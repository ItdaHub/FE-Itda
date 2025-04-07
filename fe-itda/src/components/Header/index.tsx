import clsx from "clsx";
import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import nickarrow from "@/assets/images/nick_arrow.svg";
import popcorn from "@/assets/images/popcorn_icon.png";
import comment_icon from "@/assets/images/comment_icon.png";
import mywrite from "@/assets/images/mywrite_icon.png";
import heart_icon from "@/assets/images/heart_icon.png";
import darknode from "@/assets/images/darkmode.svg";
import { useRouter } from "next/router";
import {
  ChargeButton,
  DarkModeBox,
  HeaderStyled,
  LogoutText,
  Menus,
  NickBox,
  TopBox,
  WrapContent,
} from "./styled";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Cookies from "js-cookie";
import { logout } from "@/features/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Popover, Switch } from "antd";
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
  //       const res = await api.get(`/popcorn/${user?.id}`);
  //       setNowPrice(res.data.nowPrice);
  //     } catch (error) {
  //       console.error("팝콘개수 불러오기 실패:", error);
  //     }
  //   };

  //   if (user?.id) {
  //     getCharge();
  //   }
  // }, [user?.id]);

  // 모달 내용
  const content = (
    <WrapContent>
      {/* 내정보 */}
      <NickBox
        onClick={() => {
          router.push("/mypage");
        }}
      >
        <div className="nickbox">
          연이님{/* <span>{user?.nickname || "사용자"}님</span> */}
          <img src={nickarrow.src} alt="화살표" />
        </div>
      </NickBox>

      {/* 충전 */}
      <TopBox>
        {nowPrice}
        <ChargeButton>충전</ChargeButton>
      </TopBox>

      {/* 메뉴들 */}
      <Menus>
        <div className="menu-left">
          {/* 내가 작성한 댓글 모음 */}
          <div className="menu-icon">
            <img className="comment-icon" src={comment_icon.src} alt="댓글" />
            <div>댓글 내역</div>
          </div>

          {/* 내가 사용한 캐시 모음 */}
          <div
            className="menu-icon"
            onClick={() => {
              router.push("/cashhistory");
              setVisible(false);
            }}
          >
            <img className="popcorn-icon" src={popcorn.src} alt="팝콘" />
            <div>팝콘 내역</div>
          </div>
        </div>
        <div className="menu-right">
          {/* 내가 작성한 글 모음 */}
          <div
            className="menu-icon"
            onClick={() => {
              router.push("/mywrite");
              setVisible(false);
            }}
          >
            <img className="mywrite" src={mywrite.src} alt="내글" />
            <div>내 글</div>
          </div>

          {/* 내가 찜한 작품 모음 */}
          <div
            className="menu-icon"
            onClick={() => {
              router.push("/myfavorite");
              setVisible(false);
            }}
          >
            <img className="heart" src={heart_icon.src} alt="찜" />
            <div>찜</div>
          </div>
        </div>
      </Menus>

      {/* 다크모드 토글 */}
      <DarkModeBox>
        <span>
          <img src={darknode.src} alt="다크모드" /> 다크모드
        </span>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#c47ad7",
            },
          }}
        >
          <CustomSwitch checked={mode === "dark"} onChange={toggleDarkMode} />
        </ConfigProvider>
      </DarkModeBox>

      {/* 로그아웃 */}
      <LogoutText onClick={handleLogout}>
        <span>로그아웃</span>
      </LogoutText>
    </WrapContent>
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
          {user ? (
            <Popover
              trigger="click"
              content={content}
              open={visible}
              onOpenChange={setVisible}
              placement="bottomRight"
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
