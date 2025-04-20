import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";
import NovelEpisode from "../NovelEpisode";
import NovelComments from "../NovelComments";
import { useEffect, useState } from "react";

interface NovelDetailProps {
  data?: number;
  isPublished?: string;
}

// data->작품의 Id
const NovelDetail = ({ data, isPublished }: NovelDetailProps) => {
  const [novelTitle, setNovelTitle] = useState<string>("");

  return (
    <NovelDetailStyled>
      {/* 소설 정보 */}
      <NovelInfo data={data} setNovelTitle={setNovelTitle} />
      {/* 소설 1화~ */}
      {novelTitle && <NovelEpisode data={data} novelTitle={novelTitle} />}
      {/* 소설 댓글 */}
      <NovelComments novelId={data} />
    </NovelDetailStyled>
  );
};

export default NovelDetail;
