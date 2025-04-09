import { useEffect, useState } from "react";
import { NovelInfoStyled } from "./styled";
import test from "@/assets/images/testImage.png";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import KakaoShare from "@/components/KaKaoShare";
import api from "@/utill/api";
import { useAppSelector } from "../../store/hooks";

interface NovelInfoType {
  img: string;
  title: string;
  genre: string;
  author: string;
  isLiked: boolean;
  likeNum: number;
}

const NovelInfo = ({ data }: { data?: number }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [novel, setNovel] = useState({
    img: test.src,
    title: "",
    genre: "",
    author: "",
    isLiked: false,
  });
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!data) return;

    const getNovelDetail = async () => {
      try {
        const res = await api.get(`/novels/${data}`, {
          params: user ? { userId: user.id } : {},
        });

        const novelData = res.data;

        setNovel({
          img: novelData.image || test.src,
          title: novelData.title || "제목 없음",
          genre: novelData.genre || "장르 없음",
          author: novelData.author || "작가 미상",
          isLiked: novelData.isLiked ?? false,
        });

        setLiked(novelData.isLiked ?? false);
        setLikeCount(
          typeof novelData.likeCount === "number" ? novelData.likeCount : 0
        );
      } catch (e) {
        console.error("소설 가져오기 실패: ", e);
      }
    };

    getNovelDetail();
  }, [data, user]);

  const toggleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await api.patch(`/likes/novel/${data}/toggle`);
      const isNowLiked = res.data.liked;

      setLiked(isNowLiked);
      setLikeCount((prev) => (isNowLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch (error) {
      console.error("좋아요 상태 변경 실패", error);
      alert("좋아요 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <NovelInfoStyled className={clsx("novelinfo-wrap")}>
      <img className="novelinfo-img" src={novel.img} alt={novel.title} />
      <div className="novelinfo-box">
        <div className="novelinfo-text-box">
          <div>
            <h2>{novel.title}</h2>
            <p className="novelinfo-text">{novel.genre}</p>
            <p className="novelinfo-text">{novel.author}</p>
          </div>

          <button
            className="novelinfo-btn"
            onClick={() => {
              router.push(
                `/newwrite?type=relay&title=${novel.title}&genre=${novel.genre}`
              );
            }}
          >
            함께하기
          </button>
        </div>
        <div className="novelinfo-like-wrap">
          <div className="novelinfo-like-box" onClick={toggleLike}>
            {liked ? (
              <HeartFilled style={{ fontSize: "30px", color: "red" }} />
            ) : (
              <HeartOutlined style={{ fontSize: "30px" }} />
            )}
            <p>{likeCount}</p>
          </div>
          <div>
            <KakaoShare />
          </div>
        </div>
      </div>
    </NovelInfoStyled>
  );
};

export default NovelInfo;
