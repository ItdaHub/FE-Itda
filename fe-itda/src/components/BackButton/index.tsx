import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { BackButtonStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

const BackButton = ({ type }: { type?: string }) => {
  const router = useRouter();

  return (
    <BackButtonStyled className={clsx("back-wrap")}>
      {type === "fail" ? (
        <CloseOutlined
          onClick={() => {
            router.push("/cashhistory");
          }}
        />
      ) : (
        <LeftOutlined
          onClick={() => {
            router.back();
          }}
        />
      )}
    </BackButtonStyled>
  );
};

export default BackButton;
