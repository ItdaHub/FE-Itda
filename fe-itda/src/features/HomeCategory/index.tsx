import WebNovelGroup from "@/components/WebNovelGroup";
import Banner from "../Banner";
import { HomeCategoryStyled } from "./styled";
import clsx from "clsx";
import { useState } from "react";

// 홈 카테고리
const HomeCategory = () => {
  // 연령별
  const [selectedAge, setSelectedAge] = useState<string>("teen");

  return (
    <HomeCategoryStyled className={clsx("homecategory-wrap")}>
      <div>
        {/* 배너 */}
        <Banner />

        {/* 웹소설 통합 랭킹 */}
        <WebNovelGroup title="웹소설 통합 랭킹" />

        {/* 연령별 인기작 */}
        <WebNovelGroup
          title="연령별 인기작"
          ageSelect={{ selectedAge, setSelectedAge }}
        />
      </div>
    </HomeCategoryStyled>
  );
};

export default HomeCategory;
