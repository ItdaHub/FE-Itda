import NewWrite from "@/components/NewWrite";
import { useRouter } from "next/router";

const NewWritePage = () => {
  const router = useRouter();
  const { type, title, genre } = router.query;

  // 아직 query 안 들어왔을 때
  if (!type || Array.isArray(type)) return null;

  return (
    <div>
      <NewWrite
        type={type === "relay" ? "relay" : "first"}
        titles={typeof title === "string" ? title : ""}
        genres={typeof genre === "string" ? genre : ""}
      />
    </div>
  );
};

export default NewWritePage;
