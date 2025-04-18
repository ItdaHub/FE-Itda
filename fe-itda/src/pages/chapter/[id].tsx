import Chapter from "@/features/Chapter";
import { useRouter } from "next/router";

const chapter = () => {
  const router = useRouter();
  const { novelId } = router.query;

  return <Chapter novelId={Number(novelId)} />;
};

export default chapter;
