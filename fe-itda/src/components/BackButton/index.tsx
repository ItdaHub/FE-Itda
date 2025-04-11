import { LeftOutlined } from "@ant-design/icons";
import { BackButtonStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

const BackButton = () => {
  const router = useRouter();

  return (
    <BackButtonStyled className={clsx("back-wrap")}>
      <LeftOutlined
        onClick={() => {
          router.back();
        }}
      />
    </BackButtonStyled>
  );
};

export default BackButton;
