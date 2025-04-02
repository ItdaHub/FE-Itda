import Image from "next/image";
import { WebNovelStyled } from "./styled";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface WebNovelProps {
  title: string;
  genre: string;
  likes: number;
  imageUrl: string;
  type?: string;
  index?: any;
  id: number;
}

const WebNovel = ({
  title,
  genre,
  likes,
  imageUrl,
  type,
  index,
  id,
}: WebNovelProps) => {
  const router = useRouter();

  return (
    <WebNovelStyled className="novel-wrap">
      <div
        onClick={() => {
          router.push(`/noveldetail/novelcheck/${id}`);
        }}
        className={type === "home" ? "novel-home" : "novel-relay"}
      >
        {/* 작품 이미지 */}
        <div className="novel-image">
          <Image src={imageUrl} alt={title} width={120} height={160} />
        </div>

        <div className="novel-infoBox">
          {/* 연령별 숫자표시->랭킹숫자 */}
          <div className={type === "home" ? "group-on" : "group-agerank-off"}>
            <em className="group-rank">{index + 1}</em>
          </div>

          <div className="novel-title-box">
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
      </div>
    </WebNovelStyled>
  );
};

export default WebNovel;
