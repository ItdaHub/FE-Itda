import { useState, useEffect } from "react";
import { MainPageStyled } from "./styled";
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

  // 렌더링시 카테고리 불러오기(한번)
  useEffect(() => {
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
            { label: "이어쓰기", value: "first" },
            { label: "출품작", value: "exhibit" },
          ],
          [{ label: "전체", value: "all" }, ...genreList],
        ]);
      } catch (e) {
        console.error("카테고리 불러오기 실패: ", e);
      }
    };
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
    </MainPageStyled>
  );
};

export default MainPage;
