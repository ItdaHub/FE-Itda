import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { CategoryStyled } from "./styled";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import HomeCategory from "../HomeCategory";
import WebNovelGroup from "@/components/WebNovelGroup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SearchOutlined, MenuOutlined, LeftOutlined } from "@ant-design/icons";
import NowPrice from "@/components/NowPrice";
import PopcornModal from "@/components/PopcornModal";
import MyProfile from "@/components/MyProfile";
import { logoutUser } from "../auth/logout";
import { useAppDispatch } from "@/store/hooks";
import { App as AntdApp } from "antd";
import { setType, setGenre } from "@/features/cate/categorySlice";
import { useMediaQuery } from "react-responsive";

interface CategoryProps {
  categories: any[][];
}

const Category = ({ categories }: CategoryProps) => {
  const { message } = AntdApp.useApp();
  const types = useSelector((state: RootState) => state.category.type);
  const genres = useSelector((state: RootState) => state.category.genre);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeGenre, setActiveGenre] = useState<string>(genres);
  const [keyword, setKeyword] = useState("");

  // Redux에서 로그인된 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = !!user;

  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarOpenClass, setSidebarOpenClass] = useState(false);
  const [sidebarClosing, setSidebarClosing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // sidebar 닫기
  const closeSidebar = () => {
    setSidebarClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setSidebarClosing(false);
    }, 300);
  };

  // 사이드바 자동 닫기
  useEffect(() => {
    if (!isMobile && showSidebar) {
      setShowSidebar(false);
    }
  }, [isMobile, showSidebar]);

  // 첫 번째 카테고리
  const categoryItems: TabsProps["items"] = categories[0]?.map((item) => ({
    key: item.value,
    label: item.label,
    children: (
      <div className="category-item">
        {item.value === "home" ? <HomeCategory /> : null}
      </div>
    ),
  }));

  // 두 번째 카테고리 (홈 제외)
  const genreItems: TabsProps["items"] =
    types !== "home"
      ? categories[1]?.map((item) => ({
          key: item.value,
          label: item.label,
          children: (
            <div className="category-item">
              <WebNovelGroup title="" type={types} genre={genres} />
            </div>
          ),
        }))
      : [];

  // 활성화되는거 표시
  useEffect(() => {
    if (types !== "home" && categories[1]?.length > 0) {
      setActiveGenre(categories[1][0]?.value);
    }
  }, [types, categories]);

  // 타입
  const onCategoryChange = (key: string) => {
    dispatch(setType(key));
    dispatch(setGenre("all"));
  };

  // 장르
  const onGenreChange = (key: string) => {
    dispatch(setGenre(key));
    setActiveGenre(key);
  };

  // 새로쓰기 버튼 클릭
  const handleWriteClick = () => {
    if (!isLoggedIn) {
      message.warning("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    router.push("/newwrite?type=new");
  };

  return (
    <CategoryStyled className={clsx("category-wrap")}>
      <div className="category-box">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#c47ad7",
              fontSize: 16,
            },
          }}
        >
          <div className="tabs-container">
            <Tabs
              activeKey={types}
              items={categoryItems}
              onChange={onCategoryChange}
              tabPosition="top"
            />

            {/* 새로쓰기 버튼 부분 */}
            {/* 모바일 */}
            <div className="mobile-btn">
              {/* 검색창 */}
              {showSearch && (
                <div className="search-input-wrapper">
                  <input
                    className="search-input"
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
                      }
                    }}
                  />
                </div>
              )}
              <SearchOutlined
                className="search-icon"
                onClick={() => setShowSearch(!showSearch)}
              />
              <MenuOutlined
                className="icon"
                onClick={() => {
                  if (isMobile) {
                    setShowSidebar(true);
                  }
                }}
              />
            </div>
            {/* web */}
            <div
              className="write-btn"
              onClick={handleWriteClick}
              style={{
                cursor: isLoggedIn ? "pointer" : "not-allowed",
                opacity: isLoggedIn ? 1 : 0.5,
              }}
            >
              새로쓰기
            </div>
          </div>
        </ConfigProvider>
      </div>

      {/* 사이드바 */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={closeSidebar}>
          <div
            className={clsx("sidebar", { closing: sidebarClosing })}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <LeftOutlined className="sidebar-back" onClick={closeSidebar} />

              {/* 내정보 */}
              <MyProfile userNickName={user?.nickname} />

              <div
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                {/* 충전 */}
                <NowPrice userId={user?.id} />
                {/* 팝콘 모달창 */}
              </div>
              <PopcornModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
              <div
                className="sidebar-comment sidebar-menu"
                onClick={() => {
                  router.push("/mycomment");
                }}
              >
                댓글 내역
              </div>
              <div
                className="sidebar-menu"
                onClick={() => {
                  router.push("/mywrite");
                }}
              >
                내 글
              </div>
              <div
                className="sidebar-menu"
                onClick={() => {
                  router.push("/cashhistory");
                }}
              >
                팝콘 내역
              </div>
              <div
                className="sidebar-menu"
                onClick={() => {
                  router.push("/myfavorite");
                }}
              >
                찜
              </div>
            </div>

            <div
              className="sidebar-logout"
              onClick={() => {
                dispatch(logoutUser()); // 서버 요청 + 상태 초기화
                router.push("/"); // 메인페이지로 이동
              }}
            >
              로그 아웃
            </div>
          </div>
        </div>
      )}

      {/* 두 번째 카테고리 그룹 (홈 제외) */}
      {types !== "home" && (
        <div className="category-box">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#c47ad7",
              },
            }}
          >
            <Tabs
              activeKey={activeGenre}
              items={genreItems}
              onChange={onGenreChange}
              tabPosition="top"
              tabBarStyle={{ borderBottom: "none" }}
            />
          </ConfigProvider>
        </div>
      )}
    </CategoryStyled>
  );
};

export default Category;
