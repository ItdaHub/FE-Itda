import clsx from "clsx";
import Image from "next/image";
import search from "@/assets/images/search.svg";
import ContrastIcon from "@mui/icons-material/Contrast";
import login from "@/assets/images/login.svg";
import logo from "@/assets/images/logo.png";
import popcorn from "@/assets/images/popcorn_icon.png";
import comment_icon from "@/assets/images/comment_icon.png";
import mywrite from "@/assets/images/mywrite_icon.png";
import heart_icon from "@/assets/images/heart_icon.png";
import { useRouter } from "next/router";
import { resetCategory } from "@/features/cate/categorySlice";
import {
  DarkModeBox,
  HeaderStyled,
  LogoutText,
  Menus,
  WrapContent,
} from "./styled";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { BellOutlined, NotificationOutlined } from "@ant-design/icons";
import { Badge, ConfigProvider, message, Popover } from "antd";
import { useEffect, useState } from "react";
import CustomSwitch from "@/components/common/CustomSwitch";
import { toggleTheme } from "@/features/theme/themeSlice";
import api from "@/utill/api";
import { logoutUser } from "@/features/auth/logout";
import NowPrice from "../NowPrice";
import MyProfile from "../MyProfile";
import profileStatic from "@/assets/images/img_profile_static.svg";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // 검색 키워드 값 관리
  const [keyword, setKeyword] = useState("");
  const [alertLength, setAlertLength] = useState<number>(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [noticeLength, setNoticeLength] = useState<number>(0);
  const router = useRouter();

  // 다크모드 상태 가져오기
  const mode = useAppSelector((state) => state.theme.mode);

  // 로그인된 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fromLogin = router.query.fromLogin;

    if (fromLogin) {
      // 로그인 직후에는 Popover를 닫아놓고, URL 파라미터를 정리함
      setPopoverOpen(false);
      const cleanUrl = router.pathname; // fromLogin 제거
      router.replace(cleanUrl, undefined, { shallow: true });
    }
  }, [router.query]);

  // 공지사항 개수 불러오기
  const getNoticeCount = async () => {
    try {
      const res = await api.get(`/announcement`);
      console.log(res.data);
      const unReadCount = res.data.filter(
        (item: { isRead: boolean }) => !item.isRead
      ).length;
      return unReadCount;
    } catch (e) {
      console.error("공지사항 개수 불러오기 실패:", e);
      return 0;
    }
  };

  // 알림 개수 불러오기
  const getAlertCount = async () => {
    if (user) {
      try {
        const res = await api.get("/notifications", {
          withCredentials: true,
        });
        const unReadCount = res.data.filter(
          (item: { is_read: boolean }) => !item.is_read
        ).length;
        console.log("알림개수", unReadCount);
        return unReadCount;
      } catch (e) {
        console.error("알림 개수 불러오기 실패:", e);
        return 0;
      }
    } else {
      return 0;
    }
  };

  // 공지+알림 개수
  const fetchCounts = async () => {
    const [notice, alert] = await Promise.all([
      getNoticeCount(),
      getAlertCount(),
    ]);
    setNoticeLength(notice);
    setAlertLength(alert);
  };

  useEffect(() => {
    if (user) {
      fetchCounts();

      const interval = setInterval(() => {
        fetchCounts();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  // 로그아웃
  const handleLogout = () => {
    dispatch(logoutUser()); // 서버 요청 + 상태 초기화
    router.push("/"); // 메인페이지로 이동
  };

  //Popover 열고 닫기
  const handlePopoverChange = (newOpen: boolean) => {
    if (!isMobile) {
      setPopoverOpen(newOpen);
    }
  };

  // 모바일이고 열려있다면 모달 닫아주기
  useEffect(() => {
    if (isMobile && popoverOpen) {
      setPopoverOpen(false);
    }
  }, [isMobile, popoverOpen]);

  // 헤더 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
  ];

  // chapter/숫자 형태인지 체크
  const isChapterPage = /^\/chapter\/\d+/.test(router.asPath);

  // 다른 헤더 적용
  const isHiddenStyle = notPage.includes(router.pathname);

  // 헤더 제거
  const isNoHeader = isChapterPage;
  if (isNoHeader) return null;

  // 프로필 이미지
  const profileImageSrc = user?.profile_img
    ? `http://localhost:5001/uploads/profiles/${user.profile_img}`
    : profileStatic;

  // 모달 내용
  const content = (
    <WrapContent className={clsx("content-wrap")}>
      {/* 내정보 */}
      <MyProfile userNickName={user?.nickname} />

      {/* 충전 */}
      <NowPrice userId={user?.id} />

      {/* 메뉴들 */}
      <Menus>
        <div className="menu-left">
          {/* 내가 작성한 댓글 모음 */}
          <div
            className="menu-icon"
            onClick={() => {
              router.push("/mycomment");
            }}
          >
            <img className="comment-icon" src={comment_icon.src} alt="댓글" />
            <div>댓글 내역</div>
          </div>

          {/* 내가 사용한 캐시 모음 */}
          <div
            className="menu-icon"
            onClick={() => {
              router.push("/cashhistory");
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
          <ContrastIcon className="darkimg" />
          다크모드
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

  return (
    <HeaderStyled className={clsx("header-wrap")}>
      <div className={isHiddenStyle ? "headerOff" : "header"}>
        {/* 로고 */}
        <div
          className="header-logoBox"
          onClick={() => {
            dispatch(resetCategory());
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
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    keyword.trim() === ""
                      ? message.warning("검색어를 입력해주세요")
                      : router.push(
                          `/search?keyword=${encodeURIComponent(keyword)}`
                        );
                    setKeyword("");
                  }
                }}
              />
            </div>

            <div
              className="header-searchImg"
              onClick={() => {
                keyword.trim() === ""
                  ? message.warning("검색어를 입력해주세요")
                  : router.push(
                      `/search?keyword=${encodeURIComponent(keyword)}`
                    );
                setKeyword("");
              }}
            >
              <Image src={search} alt="search" />
            </div>
          </div>

          {/* 공지사항 */}
          <div className="header-count-box">
            <Badge
              className="header-count"
              dot={noticeLength !== 0 ? true : false}
            >
              <NotificationOutlined
                className="header-louder"
                onClick={() => {
                  router.push("/notice");
                }}
              />
            </Badge>
          </div>

          {/* 알림 */}
          <div className="header-count-box">
            <Badge
              className="header-count"
              count={alertLength}
              overflowCount={999}
            >
              <BellOutlined
                className="header-alram"
                onClick={() => {
                  router.push("/alert");
                }}
              />
            </Badge>
          </div>

          {/* 로그인 or 프로필 */}
          {user ? (
            <Popover
              trigger="click"
              content={content}
              placement="bottomRight"
              open={popoverOpen}
              onOpenChange={handlePopoverChange}
            >
              <div className="header-profile" style={{ cursor: "pointer" }}>
                <Image
                  src={profileImageSrc}
                  alt="유저 이미지"
                  width={25}
                  height={25}
                  className="profile-image-wrap"
                />
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
