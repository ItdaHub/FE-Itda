import Image from "next/image";
import { WebNovelStyled } from "./styled";
import image from "@/assets/images/testImage.png";
const WebNovel = () => {
  return (
    <WebNovelStyled>
      <div>
        <div>
          <Image src={image} alt="작품이미지" />
        </div>
        <div>제목</div>
        <div>
          <div>장르</div>
          <div>찜</div>
        </div>
      </div>
    </WebNovelStyled>
  );
};

export default WebNovel;
