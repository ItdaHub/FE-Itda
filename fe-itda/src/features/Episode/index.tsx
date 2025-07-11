import clsx from "clsx";
import dayjs from "dayjs";
import { EpisodeStyled } from "./styled";

interface ItemProps {
  item: any;
}

// 각 챕터 박스
const Episode = ({ item }: ItemProps) => {
  return (
    <EpisodeStyled className={clsx("episode-wrap")}>
      <div className="episode-num">{item.chapter_number}화</div>
      <div className="episode-info">
        <div className="episode-comment-num">댓글 {item.comments.length}</div>
        <div>{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>
    </EpisodeStyled>
  );
};

export default Episode;
