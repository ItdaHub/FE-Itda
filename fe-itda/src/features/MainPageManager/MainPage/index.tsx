import { useState, useEffect } from "react";
import { MainPageStyled } from "./styled";
import Category from "@/features/Category";
import clsx from "clsx";

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
        // const response = await axios.get("/api/categories");
        // setCategories(response.data);
        setCategories([
          [
            { label: "홈", value: "home" },
            { label: "이어쓰기", value: "relay" },
            { label: "출품작", value: "exhibit" },
          ],
          [
            { label: "전체", value: "all" },
            { label: "로맨스", value: "romance" },
            { label: "판타지", value: "fantasy" },
            { label: "무협", value: "muhyeop" },
            { label: "스릴러", value: "thriller" },
          ],
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
