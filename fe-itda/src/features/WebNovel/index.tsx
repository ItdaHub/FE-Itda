import { WebNovelStyled } from "./styled";
import { EyeOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import testImage from "@/assets/images/testImage.png";
import dayjs from "dayjs";

interface GenreType {
  id: number;
  name: string;
  value: string;
}

interface ImageType {
  src: string;
}

interface WebNovelProps {
  title: string;
  genre: string | GenreType;
  likes: number;
  imageUrl: string | ImageType;
  type?: string;
  index?: number;
  id: number;
  views?: number;
  createdAt?: string;
}

const WebNovel = ({
  title,
  genre,
  likes,
  imageUrl,
  type,
  index = 0,
  id,
  views,
  createdAt,
}: WebNovelProps) => {
  const router = useRouter();

  // 장르 이름 추출
  const genreName =
    genre && typeof genre === "object" && "name" in genre ? genre.name : genre;

  // 이미지 경로 처리
  const imageSrc =
    imageUrl && typeof imageUrl === "object" && "src" in imageUrl
      ? imageUrl.src
      : typeof imageUrl === "string" && imageUrl.trim() !== ""
      ? imageUrl
      : testImage.src;

  return (
    <WebNovelStyled className="novel-wrap">
      <div
        onClick={async () => {
          await router.push(`/noveldetail/novelcheck/${id}`);
        }}
        className="novel-home"
      >
        {/* 작품 이미지 */}
        <div
          className={`novel-image ${
            type === "myfavorite" || type === "mywrite"
              ? "myfavorite-image"
              : ""
          }`}
        >
          <img
            src={imageSrc}
            alt={title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = testImage.src;
            }}
          />
          {/* 내 찜 + 내 글 -> 호버시 소설 정보 */}
          {(type === "myfavorite" || type === "mywrite") && (
            <div className="myfavorite-overlay">
              <div className="overlay-content">
                <div className="overlay-title">{title}</div>
                <div className="overlay-genre">{genreName}</div>

                {type === "mywrite" && (
                  <div>{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                )}

                <div
                  className={`overlay-likes ${
                    type === "mywrite" ? "overlay-write" : ""
                  }`}
                >
                  <span className="overlay-heart">
                    <HeartOutlined />
                  </span>
                  {likes}
                  {type === "mywrite" && (
                    <>
                      <span className="overlay-eye">
                        <EyeOutlined />
                      </span>
                      {views}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={
            type === "myfavorite" || type === "mywrite"
              ? "novel-info-off"
              : "novel-infoBox"
          }
        >
          {/* 랭킹 숫자 -> 홈에만 나타남 */}
          <div className={type === "home" ? "group-on" : "group-agerank-off"}>
            <em className="group-rank">{index + 1}</em>
          </div>

          <div className="novel-title-box">
            <div className="novel-title">{title}</div>

            <div className="novel-info">
              <div className="novel-genre">{genreName}</div>
              <div className="novel-likes">
                <HeartFilled /> {likes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebNovelStyled>
  );
};

export default WebNovel;
