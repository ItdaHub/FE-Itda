import NewWrite from "@/components/NewWrite";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NewWritePage = () => {
  const router = useRouter();
  const { type, title, genre, novelId } = router.query;

  // 아직 query 안 들어왔을 때
  if (!type || Array.isArray(type)) return null;

  return (
    <div>
      <NewWrite
        type={type === "relay" ? "relay" : "new"}
        titles={typeof title === "string" ? title : ""}
        genres={typeof genre === "string" ? genre : ""}
        novelId={novelId ? Number(novelId) : undefined}
      />
    </div>
  );
};

export default NewWritePage;
