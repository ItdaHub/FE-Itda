import Chapter from "@/features/Chapter";
import { useRouter } from "next/router";

const ChapterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { novelId } = router.query;

  if (!id || !novelId) return null;

  return <Chapter chapterId={Number(id)} novelId={Number(novelId)} />;
};

export default ChapterPage;
