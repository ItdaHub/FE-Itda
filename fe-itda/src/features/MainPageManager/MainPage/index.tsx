import { useState, useEffect } from "react";
import { MainPageStyled } from "./styled";
import Banner from "@/features/Banner";
import Category from "@/features/Category";
import WebNovelGroup from "@/components/WebNovelGroup";
import axios from "axios";
import clsx from "clsx";

const MainPage = () => {
  // 카테고리 [[],[]]형태
  const [categories, setCategories] = useState<string[][]>([]);

  // 카테고리
  const [type, setType] = useState<string>("home");

  // 장르
  const [genre, setGenre] = useState<string>("all");

  // 연령별
  const [selectedAge, setSelectedAge] = useState<string>("teen");

  // 렌더링시 카테고리 불러오기(한번)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data); //[["홈","릴레이북","출품작"],["전체","로맨스","로판","판타지","현판","무협","미스터리"]]
      } catch (e) {
        console.error("카테고리 불러오기 실패: ", e);
      }
    };
    fetchCategories();
  }, []);

  return (
    <MainPageStyled className={clsx("main-wrap")}>
      {/* 카테고리 */}
      <Category type={type} setType={setType} categories={categories} />

      {/* 배너 */}
      <Banner />

      {type === "home" ? (
        <>
          <WebNovelGroup title="웹소설 통합 랭킹" type={type} genre={genre} />

          {/* 연령별 인기작 */}
          <WebNovelGroup
            title="연령별 인기작"
            type={type}
            genre={selectedAge}
            ageSelect={{ selectedAge, setSelectedAge }}
          />
        </>
      ) : (
        <WebNovelGroup title="" type={type} genre={genre} />
      )}
    </MainPageStyled>
  );
};

export default MainPage;
