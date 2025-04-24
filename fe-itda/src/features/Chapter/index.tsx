import NovelComments from "../NovelComments";
import ReadBook from "../ReadBook";
import { ChapterStyled } from "./styled";

interface NovelIdProps {
  chapter_number: number;
  chapterId: number;
  novelId: number;
}

// 1화 이런거 누르면 해당 챕터의 소설 내용볼 수 있음
const Chapter = ({ chapter_number, chapterId, novelId }: NovelIdProps) => {
  if (!chapter_number || isNaN(chapter_number)) return null;

  return (
    <ChapterStyled>
      {/* 읽는부분+작가 */}
      <ReadBook
        novelId={novelId}
        chapterId={chapterId}
        chapter_number={chapter_number}
      />
      {/* 챕터 댓글 */}
      <NovelComments novelId={novelId} chapterId={chapterId} type="chapter" />
    </ChapterStyled>
  );
};

export default Chapter;
