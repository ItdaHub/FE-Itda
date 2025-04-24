import Chapter from "@/features/Chapter";
import { useRouter } from "next/router";

const chapter = () => {
  const router = useRouter();
  const { id, novelId } = router.query;

  return <Chapter chapterId={Number(id)} novelId={Number(novelId)} />;
};

export default chapter;
