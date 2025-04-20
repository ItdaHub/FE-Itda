import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";
import NovelEpisode from "../NovelEpisode";
import NovelComments from "../NovelComments";

interface NovelDetailProps {
  data?: number;
  isPublished?: string;
}

// data->작품의 Id
const NovelDetail = ({ data, isPublished }: NovelDetailProps) => {
  return (
    <NovelDetailStyled>
      {/* 소설 정보 */}
      <NovelInfo data={data} />
      {/* 소설 1화~ */}
      <NovelEpisode data={data} isPublished={isPublished} />
      {/* 소설 댓글 */}
      <NovelComments novelId={data} />
    </NovelDetailStyled>
  );
};

export default NovelDetail;
