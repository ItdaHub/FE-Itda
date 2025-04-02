import axios from "axios";
import { NovelDetailStyled } from "./styled";

import test from "@/assets/images/testImage.png";
import { useEffect, useState } from "react";

type NovelInfoType = {
  img: string;
  title: string;
  genre: string;
  author: string;
  likeWhether: boolean;
  likeNum: number;
};

const NovelDetail = ({ data }: { data?: number }) => {
  const [novel, setNovel] = useState<Partial<NovelInfoType>>({});

  const novelInfo: NovelInfoType = {
    img: test.src,
    title: "그 새의 날개는 어디에",
    genre: "로맨스",
    author: "톰곰이, 아이, 라라, 미",
    likeWhether: true,
    likeNum: 25,
  };

  useEffect(() => {
    const getNovelDetail = async () => {
      try {
        // const res = await axios.get(`/novel/detail/${data}`);
        // console.log("소설 정보:", res.data);
        // setNovel(res.data);
        setNovel(novelInfo);
      } catch (e) {
        console.error("소설 가져오기 실패: ", e);
      }
    };

    getNovelDetail();
  }, [data]);

  return (
    <NovelDetailStyled>
      <h2>{novel.title}</h2>
      <img src={novel.img} alt={novel.title} />
      <p>장르: {novel.genre}</p>
      <p>작가: {novel.author}</p>
      <p>좋아요: {novel.likeNum}</p>
    </NovelDetailStyled>
  );
};

export default NovelDetail;
