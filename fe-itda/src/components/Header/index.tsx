import clsx from "clsx";

import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alert from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import Cookies from "js-cookie";
import { logout } from "@/features/auth/authSlice";
import {
  BellOutlined,
  CreditCardOutlined,
  DownOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Menu, Switch, Popover } from "antd";
import ProfileSelectModal from "@/features/UserProfilesModal";
import { useState } from "react";

import styled from "styled-components";

const ProfilePopover = styled(Popover)`
  .ant-popover-inner {
    width: 250px; /* 너비 조정 */
    padding: 15px;
    border-radius: 10px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  svg {
    margin-right: 10px;
  }
`;

const Header = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  // 로그인된 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

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

  // 팝오버 내용
  const content = (
    <div>
      {/* 닉네임 & 충전 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 10px",
          background: "#f5f5f5",
          borderRadius: "6px",
        }}
      >
        <span>{user?.nickname || "사용자"}</span>
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

      {/* 메뉴 리스트 */}
      <MenuItem onClick={() => router.push("/alert")}>
        <BellOutlined /> 알림
      </MenuItem>
      <MenuItem onClick={() => router.push("/pass-vip")}>
        <CreditCardOutlined /> 캐시 PASS VIP
      </MenuItem>
      <MenuItem onClick={() => router.push("/settings")}>
        <SettingOutlined /> 설정
      </MenuItem>

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
        <Switch />
      </div>

      {/* 로그아웃 */}
      <MenuItem
        onClick={handleLogout}
        style={{ color: "red", borderTop: "1px solid #ddd", marginTop: "5px" }}
      >
        로그아웃
      </MenuItem>
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
              />
            </div>

            <div className="header-searchImg">
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
              src={alert}
              alt="alert"
              onClick={() => {
                router.push("/alert");
              }}
            />
          </div>

          {/* 로그인 or 프로필 */}
          {user ? (
            <ProfilePopover
              content={content}
              trigger="click"
              // visible={visible}
              // onVisibleChange={setVisible}
              placement="bottomRight" // 클릭한 곳의 아래 오른쪽에 배치
            >
              <div className="header-profile" style={{ cursor: "pointer" }}>
                <Avatar size="small" icon={<UserOutlined />} />
              </div>
            </ProfilePopover>
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
