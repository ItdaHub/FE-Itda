import { useEffect, useState } from "react";
import { NovelInfoStyled } from "./styled";
import test from "@/assets/images/testImage.png";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import KakaoShare from "@/components/KaKaoShare";
import api from "@/utill/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

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

  // 로그인된 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const [novel, setNovel] = useState<Partial<NovelInfoType>>({});
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const novelInfo: NovelInfoType = {
    img: test.src,
    title: "그 새의 날개는 어디에",
    genre: "로맨스",
    author: "톰곰이, 아이, 라라, 미",
    isLiked: true,
    likeNum: 25,
  };

  useEffect(() => {
    const getNovelDetail = async () => {
      try {
        // const res = await api.get(`/novels/${data}`);
        // console.log("소설 정보:", res.data);
        // setNovel(res.data);
        setNovel(novelInfo);
        setLiked(novelInfo.isLiked);
        setLikeCount(novelInfo.likeNum);
      } catch (e) {
        console.error("소설 가져오기 실패: ", e);
      }
    };

    getNovelDetail();
  }, [data]);

  const toggleLike = async () => {
    try {
      // 찜 axios post요청
      if (liked) {
        // await api.post(`/likes/novel/${user?.id}/${data}`);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        // await api.delete(`/likes/novel/${user?.id}/${data}`);
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like status", error);
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
