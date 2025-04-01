import Image from "next/image";
import { WebNovelStyled } from "./styled";
import { HeartOutlined } from "@ant-design/icons";

interface WebNovelProps {
  title: string;
  genre: string;
  likes: number;
  imageUrl: string;
  type?: string;
  index?: any;
}

const WebNovel = ({
  title,
  genre,
  likes,
  imageUrl,
  type,
  index,
}: WebNovelProps) => {
  return (
    <WebNovelStyled className="novel-wrap">
      <div className="novel-home">
        {/* 작품 이미지 */}
        <div className="novel-image">
          <Image src={imageUrl} alt={title} width={120} height={160} />
        </div>

        {/* 연령별 숫자표시 */}
        <div
          className={
            type === "home" && genre !== "rank"
              ? "group-agerank-on"
              : "group-agerank-off"
          }
        >
          <em className="group-rank">{index + 1}</em>
        </div>

        <div className="novel-infoBox">
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
      </div>
    </WebNovelStyled>
  );
};

export default WebNovel;
