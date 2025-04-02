import axios from "axios";
import { NovelDetailStyled } from "./styled";

import test from "@/assets/images/testImage.png";
import { useState } from "react";

type NovelInfoType = {
  img: string;
  title: string;
  genre: string;
  author: string;
  likeWhether: boolean;
  likeNum: number;
};

const NovelDetail = ({ data }: { data?: number }) => {
  const [Novel, setNovel] = useState<Partial<NovelInfoType>>({});

  const novelInfo = [
    { img: test },
    { title: "그 새의 날개는 어디에" },
    { genre: "로맨스" },
    { author: "톰곰이, 아이, 라라, 미" },
    { likeWhether: true },
    { likeNum: 25 },
  ];

  const getNovelDetail = async () => {
    try {
      const res = await axios.get(`/novel/detail/${data}`);
      if (res.data) {
        console.log(res.data);
      } else {
        console.log("실패");
      }
    } catch (e) {
      console.error("해당 소설 가져오기 실패: ", e);
    }
  };

  return (
    <NovelDetailStyled>
      <div>{data}</div>
    </NovelDetailStyled>
  );
};

export default NovelDetail;
