import clsx from "clsx";
import { NovelRecommendStyled } from "./styled";
import { useEffect, useState } from "react";
import defaultimg from "@/assets/images/testImage.png";
import api from "@/utill/api";
import { useRouter } from "next/router";

const NovelRecommend = () => {
  const [novels, setNovels] = useState<any[]>([]);
  const router = useRouter();

  const getNovel = async () => {
    try {
      // 통합 랭킹
      const res = await api.get("/novels/rankings");
      setNovels(res.data);
      console.log("sasf", res.data);
    } catch (e) {
      console.error("통합 랭킹 소설 가져오기 실패: ", e);
    }
  };

  useEffect(() => {
    getNovel();
  }, []);

  // 이미지 처리
  const getImageSrc = (imageUrl: any): string => {
    if (!imageUrl) return defaultimg.src; // 기본 이미지 경로

    if (typeof imageUrl === "object" && "src" in imageUrl) {
      return imageUrl.src;
    }

    if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
      return imageUrl;
    }

    return defaultimg.src; // 빈 문자열이거나 유효하지 않으면 기본 이미지
  };

  return (
    <NovelRecommendStyled className={clsx("novelrecommend-wrap")}>
      <div className="novelrecommend-title-box">
        <div className="novelrecommend-title">추천 소설</div>
      </div>

      <div>
        {novels.length !== 0 ? (
          <div className="novelrecommend-row">
            {novels.map((novel, i) => (
              <div
                key={i}
                className="novelrecommend-one"
                onClick={() => {
                  router.push(`/noveldetail/novelcheck/${novel.id}`);
                }}
              >
                <div className="novelrecommend-img-box">
                  <img
                    src={getImageSrc(novel.imageUrl)}
                    alt={novel.title}
                    className="novelrecommend-img"
                  />
                </div>
                <div className="novelrecommend-info">
                  <div className="novelrecommend-title">{novel.title}</div>
                  <div className="novelrecommend-nick">
                    {novel.creator.nickname}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>추천 소설이 없습니다.</div>
        )}
      </div>
    </NovelRecommendStyled>
  );
};

export default NovelRecommend;
