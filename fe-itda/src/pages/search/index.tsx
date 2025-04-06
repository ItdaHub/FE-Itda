import SearchResult from "@/features/Search";
import { useRouter } from "next/router";

const search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  // 타입 가드 처리
  const keywords = typeof keyword === "string" ? keyword : "";

  return (
    <>
      <SearchResult keyword={keywords} />
    </>
  );
};

export default search;
