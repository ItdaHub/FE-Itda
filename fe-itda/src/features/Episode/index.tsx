import clsx from "clsx";
import { EpisodeStyled } from "./styled";

const Episode = ({ item, index }: { item: any; index: number }) => {
  return (
    <EpisodeStyled className={clsx("episode-wrap")}>
      <div>{index}화</div>
      <div>댓글 {item.commentNum}</div>
      <div>{item.createDate}</div>
    </EpisodeStyled>
  );
};

export default Episode;
