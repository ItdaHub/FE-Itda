import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { CategoryStyled } from "./styled";
import { ConfigProvider, Tabs, message } from "antd";
import type { TabsProps } from "antd";
import HomeCategory from "../HomeCategory";
import WebNovelGroup from "@/components/WebNovelGroup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Category = ({
  type,
  setType,
  genre,
  setGenre,
  categories,
}: {
  type: string;
  setType: (type: string) => void;
  genre: string;
  setGenre: (genre: string) => void;
  categories: any[][];
}) => {
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState<string>(genre);

  // Redux에서 로그인된 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user;

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
    type !== "home"
      ? categories[1]?.map((item) => ({
          key: item.value,
          label: item.label,
          children: (
            <div className="category-item">
              <WebNovelGroup title="" type={type} genre={genre} />
            </div>
          ),
        }))
      : [];

  // 활성화되는거 표시
  useEffect(() => {
    if (type !== "home" && categories[1]?.length > 0) {
      setActiveGenre(categories[1][0]?.value);
    }
  }, [type, categories]);

  // 타입
  const onCategoryChange = (key: string) => {
    setType(key);
    setGenre("all");
  };

  // 장르
  const onGenreChange = (key: string) => {
    setGenre(key);
    setActiveGenre(key);
  };

  // 새로쓰기 버튼 클릭
  const handleWriteClick = () => {
    if (!isLoggedIn) {
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
              defaultActiveKey={type}
              items={categoryItems}
              onChange={onCategoryChange}
              tabPosition="top"
            />

            {/* 새로쓰기 버튼 */}
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

      {/* 두 번째 카테고리 그룹 (홈 제외) */}
      {type !== "home" && (
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
