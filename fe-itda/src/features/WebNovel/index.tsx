import Image from "next/image";
import { WebNovelStyled } from "./styled";
import { HeartOutlined } from "@ant-design/icons";

interface WebNovelProps {
  title: string;
  genre: string;
  likes: number;
  imageUrl: string;
  type?: string;
}

const WebNovel = ({ title, genre, likes, imageUrl, type }: WebNovelProps) => {
  return (
    <WebNovelStyled className="novel-wrap">
      <div>
        {/* 작품 이미지 */}
        <div className="novel-image">
          <Image src={imageUrl} alt={title} width={120} height={160} />
        </div>

        {/* 작품 제목 */}
        <div className="novel-title">{title}</div>

        {/* 작품 정보 (장르, 찜 개수) */}
        <div className="novel-info">
          <div className="novel-genre">{genre}</div>
          <div className="novel-likes">
            <HeartOutlined /> {likes}
          </div>
        </div>
      </div>
    </WebNovelStyled>
  );
};

export default WebNovel;
