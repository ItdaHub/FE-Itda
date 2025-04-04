import clsx from "clsx";
import { EpisodeStyled } from "./styled";

const Episode = ({ item, index }: { item: any; index: number }) => {
  return (
    <EpisodeStyled className={clsx("episode-wrap")}>
      <div color="episode-num">{index}화</div>
      <div className="episode-info">
        <div className="episode-comment-num">댓글 {item.commentNum}</div>
        <div>{item.createDate}</div>
      </div>
    </EpisodeStyled>
  );
};

export default Episode;
