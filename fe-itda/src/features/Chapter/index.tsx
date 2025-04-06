import NovelComments from "../NovelComments";
import ReadBook from "../ReadBook";
import WriterProfile from "../WriterProfile";
import { ChapterStyled } from "./styled";

// 1화 이런거 누르면 해당 챕터의 소설 내용볼 수 있음
const Chapter = ({ chapterId }: { chapterId: number }) => {
  return (
    <ChapterStyled>
      <ReadBook chapterId={chapterId} isFromPaidClick={true} />
      <WriterProfile chapterId={chapterId} />
      <NovelComments data={chapterId} type="chapter" />
    </ChapterStyled>
  );
};

export default Chapter;
