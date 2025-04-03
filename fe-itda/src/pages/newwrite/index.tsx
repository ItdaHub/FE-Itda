import NewWrite from "@/components/NewWrite";
import { useRouter } from "next/router";

const newwrite = () => {
  const router = useRouter();
  const { type, title, genre } = router.query;
  return (
    <div>
      <NewWrite type={type} titles={title} genres={genre} />
    </div>
  );
};

export default newwrite;
