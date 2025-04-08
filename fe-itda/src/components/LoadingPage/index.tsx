import clsx from "clsx";
import { LoadingPageStyled } from "./styled";
import loading from "@/assets/images/loading.gif";

const LoadingPage = () => {
  return (
    <LoadingPageStyled className={clsx("loading-wrap")}>
      <img src={loading.src} alt="로딩 중" />
      <p>Loading...</p>
    </LoadingPageStyled>
  );
};

export default LoadingPage;
