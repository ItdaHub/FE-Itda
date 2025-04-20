import NovelDetail from "@/features/NovelDetail";
import { useRouter } from "next/router";

//작품 상세내용(작품소개+회차)
const NovelCheck = () => {
  const router = useRouter();

  const { id, isPublished } = router.query;

  return (
    <NovelDetail
      data={Number(id)}
      isPublished={Array.isArray(isPublished) ? isPublished[0] : isPublished}
    />
  );
};

export default NovelCheck;
