import clsx from "clsx";
import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Cookies from "js-cookie";
import { logout } from "@/features/auth/authSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Switch } from "antd";
import { useState } from "react";
import CustomSwitch from "@/components/common/CustomSwitch";
import { toggleTheme } from "@/features/theme/themeSlice";

const Header = () => {
  // 검색 키워드 값 관리
  const [keyword, setKeyword] = useState("");

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

  // 모달 내용
  const content = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 10px",
          background: "#f5f5f5",
          borderRadius: "6px",
        }}
      >
        {/* <span>{user?.nickname || "사용자"}</span> */}
        <button
          style={{
            background: "#FFC107",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          충전
        </button>
      </div>

      {/* 다크모드 토글 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <span>🌙 다크모드</span>
        <CustomSwitch checked={mode === "dark"} onChange={toggleDarkMode} />
      </div>

      {/* 로그아웃 */}
      <div
        onClick={handleLogout}
        style={{ color: "red", borderTop: "1px solid #ddd", marginTop: "5px" }}
      >
        로그아웃
      </div>
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
          {user ? (
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
