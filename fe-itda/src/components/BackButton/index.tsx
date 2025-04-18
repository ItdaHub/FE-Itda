import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { BackButtonStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

interface TypeProps {
  type?: string;
}

const BackButton = ({ type }: TypeProps) => {
  const router = useRouter();

  return (
    <BackButtonStyled className={clsx("back-wrap")}>
      {/* 결제 실패시 x버튼 */}
      {type === "fail" ? (
        <CloseOutlined
          onClick={() => {
            router.push("/cashhistory");
          }}
        />
      ) : (
        // 나머진 < 버튼
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
