import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";
import NovelEpisode from "../NovelEpisode";
import NovelComments from "../NovelComments";

// data->작품의 Id
const NovelDetail = ({ data }: { data?: number }) => {
  return (
    <NovelDetailStyled>
      <NovelInfo data={data} />
      <NovelEpisode data={data} />
      <NovelComments data={data} />
    </NovelDetailStyled>
  );
};

export default NovelDetail;
