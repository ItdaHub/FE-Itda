import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";
import NovelEpisode from "../NovelEpisode";
import NovelComments from "../NovelComments";

// data->작품의 Id
const NovelDetail = ({ data }: { data?: number }) => {
  return (
    <NovelDetailStyled>
      {/* 소설 정보 */}
      <NovelInfo data={data} />
      {/* 소설 1화~ */}
      <NovelEpisode data={data} />
      {/* 소설 댓글 */}
      <NovelComments novelId={data} />
    </NovelDetailStyled>
  );
};

export default NovelDetail;
