import clsx from "clsx";
import { NovelEpisodeStyled } from "./styled";
import Episode from "../Episode";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useRouter } from "next/router";

type EpisodeType = {
  id: number;
  commentNum: number;
  createDate: string;
};

interface DataProps {
  data?: number;
}

const NovelEpisode = ({ data }: DataProps) => {
  const [activeCate, setActiveCate] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);

  const router = useRouter();

  // 에피소드 가져오기 요청
  useEffect(() => {
    if (!data) return;

    const getEpisode = async () => {
      try {
        const res = await api.get(`/chapters/${data}`);
        setEpisode([...res.data].sort((a, b) => b.id - a.id));
        console.log(res.data);
      } catch (e) {
        console.error("에피소드 가져오기 실패: ", e);
      }
    };

    getEpisode();
  }, [data]);

  // 1화+최신순 정렬
  const handleSort = (isLatest: boolean) => {
    const sorted = [...episode].sort((a, b) =>
      isLatest ? a.id - b.id : b.id - a.id
    );
    setEpisode(sorted);
    setActiveCate(isLatest);
  };

  return (
    <NovelEpisodeStyled className={clsx("novelEpisode-wrap")}>
      <div className="novelEpisode-info-box">
        <div className="novelEpisode-title">
          작품 회차 <span className="novelEpisode-num">({episode.length})</span>
        </div>
        <ul className="novelEpisode-sort">
          <li>
            <button
              onClick={() => handleSort(false)}
              className={`novelEpisode-btn-one ${!activeCate ? "active" : ""}`}
            >
              최신순
            </button>
          </li>
          <li className="novelEpisode-one">
            <button
              onClick={() => handleSort(true)}
              className={`novelEpisode-btn ${activeCate ? "active" : ""}`}
            >
              1화부터
            </button>
          </li>
        </ul>
      </div>

      <ul>
        {episode.map((item, i) => (
          <li
            onClick={() => router.push(`/chapter/${item.id}?novelId=${data}`)}
            className="novelEpisode-list"
            key={item.id}
          >
            <Episode item={item} />
          </li>
        ))}
      </ul>
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
