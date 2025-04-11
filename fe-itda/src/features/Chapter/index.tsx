import { useState } from "react";
import NovelComments from "../NovelComments";
import ReadBook from "../ReadBook";
import WriterProfile from "../WriterProfile";
import { ChapterStyled } from "./styled";

// 1화 이런거 누르면 해당 챕터의 소설 내용볼 수 있음
const Chapter = ({
  chapterId: initialChapterId,
  novelId,
}: {
  chapterId: number;
  novelId: number;
}) => {
  const [chapterId, setChapterId] = useState(initialChapterId);

  return (
    <ChapterStyled>
      <ReadBook
        novelId={novelId}
        chapterId={chapterId}
        setChapterId={setChapterId}
        isFromPaidClick={true}
      />
      <NovelComments novelId={novelId} chapterId={chapterId} type="chapter" />
    </ChapterStyled>
  );
};

export default Chapter;
