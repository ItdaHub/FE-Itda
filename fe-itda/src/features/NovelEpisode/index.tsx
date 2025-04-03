import clsx from "clsx";
import { NovelEpisodeStyled } from "./styled";
import Episode from "../Episode";
import { useEffect, useState } from "react";
import api from "@/utill/api";

type EpisodeType = {
  id: number;
  commentNum: number;
  createDate: string;
};

const NovelEpisode = ({ data }: { data?: number }) => {
  const [activeCate, setActiveCate] = useState<boolean>(true);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);

  // 회차 표시는 프론트에서 처리
  const episodes = [
    {
      id: 1,
      commentNum: 20,
      createDate: "2025.02.03",
    },
    {
      id: 2,
      commentNum: 10,
      createDate: "2025.02.05",
    },
    {
      id: 3,
      commentNum: 15,
      createDate: "2025.02.06",
    },
    {
      id: 4,
      commentNum: 8,
      createDate: "2025.02.06",
    },
    {
      id: 5,
      commentNum: 2,
      createDate: "2025.02.08",
    },
  ];

  useEffect(() => {
    if (!data) return; // data가 없으면 요청x
    const getEpisode = async () => {
      try {
        // axios요청->각 회차별 정보 가져오기(여기서 url파라미터로 보내는건 작품의 id)
        // const res = await api.get(`/episode/${data}`);
        // setEpisode(res.data);
        setEpisode(episodes);
      } catch (e) {
        console.error("에피소드 가져오기 실패: ", e);
      }
    };
    getEpisode();
  }, [data]);

  // 정렬
  const handleSort = (isLatest: boolean) => {
    const sortedEpisodes = [...episode].sort((a, b) =>
      isLatest ? b.id - a.id : a.id - b.id
    );
    setEpisode(sortedEpisodes);
    setActiveCate(isLatest);
  };

  return (
    <NovelEpisodeStyled className={clsx("episode-wrap")}>
      <div className="episode-info-box">
        <div className="episode-title">
          작품 회차 <span className="episode-num">({episode.length})</span>
        </div>
        <ul className="episode-sort">
          <li>
            <button
              onClick={() => {
                handleSort(!activeCate);
              }}
              className={`episode-btn ${activeCate === true ? "active" : ""}`}
            >
              최신순
            </button>
          </li>
          <li className="episode-one">
            <button
              onClick={() => {
                handleSort(!activeCate);
              }}
              className={`episode-btn-one ${
                activeCate === true ? "" : "active"
              }`}
            >
              1화부터
            </button>
          </li>
        </ul>
      </div>
      {episode.map((item: any, i: number) => (
        <div key={i}>
          <Episode
            item={item}
            index={activeCate === true ? i + 1 : episode.length - i}
          />
        </div>
      ))}
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
