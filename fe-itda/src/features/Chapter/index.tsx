import NovelComments from "../NovelComments";
import ReadBook from "../ReadBook";
import WriterProfile from "../WriterProfile";
import { ChapterStyled } from "./styled";

// 1화 이런거 누르면 해당 챕터의 소설 내용볼 수 있음
const Chapter = ({
  chapterId,
  novelId,
}: {
  chapterId: number;
  novelId: number;
}) => {
  return (
    <ChapterStyled>
      <ReadBook
        novelId={novelId}
        chapterId={chapterId}
        isFromPaidClick={true}
      />
      <WriterProfile novelId={novelId} chapterId={chapterId} />
      <NovelComments novelId={novelId} chapterId={chapterId} type="chapter" />
    </ChapterStyled>
  );
};

export default Chapter;
