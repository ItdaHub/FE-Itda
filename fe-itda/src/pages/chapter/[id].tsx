import Chapter from "@/features/Chapter";
import { useRouter } from "next/router";

const chapter = () => {
  const router = useRouter();
  const { id, novelId, chapterId } = router.query;

  return (
    <Chapter
      chapter_number={Number(id)}
      chapterId={Number(chapterId)}
      novelId={Number(novelId)}
    />
  );
};

export default chapter;
