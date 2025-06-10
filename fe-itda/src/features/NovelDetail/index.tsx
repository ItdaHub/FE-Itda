import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";
import NovelEpisode from "../NovelEpisode";
import NovelComments from "../NovelComments";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NovelRecommend from "../NovelRecommend";

interface NovelDetailProps {
  data?: number;
}

// data->작품의 Id
const NovelDetail = ({ data }: NovelDetailProps) => {
  const [novelTitle, setNovelTitle] = useState<string>("");

  return (
    <NovelDetailStyled className={clsx("noveldetail-wrap")}>
      {/* 소설 정보 */}
      <NovelInfo data={data} setNovelTitle={setNovelTitle} />
      <div className="noveldetail-box">
        <div className="noveldetail-epi">
          {/* 소설 1화~ */}
          {novelTitle && <NovelEpisode data={data} novelTitle={novelTitle} />}
          {/* 소설 댓글 */}
          <NovelComments novelId={data} />
        </div>
        <NovelRecommend />
      </div>
    </NovelDetailStyled>
  );
};

export default NovelDetail;
