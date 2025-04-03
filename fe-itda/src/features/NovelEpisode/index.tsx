import { NovelEpisodeStyled } from "./styled";

const NovelEpisode = ({ data }: { data?: number }) => {
  const episode = {
    id: 1,
    commentNum: 20,
    createDate: "2025-02-03",
  };

  return (
    <NovelEpisodeStyled>
      <div>에피소드</div>
      <div></div>
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
