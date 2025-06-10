import clsx from "clsx";
import { NovelRecommendStyled } from "./styled";

const NovelRecommend = () => {
  return (
    <NovelRecommendStyled className={clsx("noveldetail-wrap")}>
      <div className="noveldetail-title-box">
        <div className="noveldetail-title">추천 소설</div>
      </div>

      <div></div>
    </NovelRecommendStyled>
  );
};

export default NovelRecommend;
