import { useState } from "react";
import NovelComments from "../NovelComments";
import ReadBook from "../ReadBook";
import WriterProfile from "../WriterProfile";
import { ChapterStyled } from "./styled";
import { useRouter } from "next/router";

interface NovelIdProps {
  novelId: number;
}

// 1화 이런거 누르면 해당 챕터의 소설 내용볼 수 있음
const Chapter = ({ novelId }: NovelIdProps) => {
  const router = useRouter();
  const chapterId = Number(router.query.id);

  if (!chapterId || isNaN(chapterId)) return null;

  return (
    <ChapterStyled>
      {/* 읽는부분+작가 */}
      <ReadBook
        novelId={novelId}
        chapterId={chapterId}
        isFromPaidClick={true}
      />
      {/* 챕터 댓글 */}
      <NovelComments novelId={novelId} chapterId={chapterId} type="chapter" />
    </ChapterStyled>
  );
};

export default Chapter;
