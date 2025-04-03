import Chapter from "@/features/Chapter";
import { useRouter } from "next/router";

const chapter = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Chapter chapterId={Number(id)} />;
};

export default chapter;
