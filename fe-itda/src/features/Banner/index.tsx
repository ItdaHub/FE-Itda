import clsx from "clsx";
import { BannerStyled } from "./styled";

const Banner = () => {
  return (
    <BannerStyled className={clsx("banner-wrap")}>
      <div>배너</div>
    </BannerStyled>
  );
};

export default Banner;
