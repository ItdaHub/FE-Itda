import { useState, useEffect } from "react";
import { MainPageStyled } from "./styled";
import CreateIcon from "@mui/icons-material/Create";
import { FloatButton } from "antd";
import { useRouter } from "next/router";
import Category from "@/features/Category";
import clsx from "clsx";
import api from "@/utill/api";

const MainPage = () => {
  // 카테고리 [[],[]]형태
  const [categories, setCategories] = useState<object[][]>([]);

  // 카테고리
  const [type, setType] = useState<string>("home");

  // 장르
  const [genre, setGenre] = useState<string>("all");

  const router = useRouter();

  // 카테고리 불러오기
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      const genreList = response.data.map((genre: any) => ({
        label: genre.name,
        value: genre.value,
      }));

      setCategories([
        [
          { label: "홈", value: "home" },
          { label: "이어쓰기", value: "new" },
          { label: "출품작", value: "exhibit" },
        ],
        [{ label: "전체", value: "all" }, ...genreList],
      ]);
    } catch (e) {
      console.error("카테고리 불러오기 실패: ", e);
    }
  };

  // 렌더링시 카테고리 불러오기
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MainPageStyled className={clsx("main-wrap")}>
      {/* 카테고리 */}
      <Category
        type={type}
        setType={setType}
        genre={genre}
        setGenre={setGenre}
        categories={categories}
      />
      {/* Top버튼 + 글쓰기 */}
      <FloatButton
        className="float-mobile"
        icon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CreateIcon style={{ fontSize: 20 }} />
          </div>
        }
        type="primary"
        style={{ right: 20, bottom: 80 }}
        onClick={() => router.push(`/newwrite?type="new"`)}
      />

      <FloatButton.BackTop
        className="float-web"
        visibilityHeight={0}
        style={{ bottom: 80 }}
      />
    </MainPageStyled>
  );
};

export default MainPage;
