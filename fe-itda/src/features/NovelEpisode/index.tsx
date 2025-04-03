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

const NovelEpisode = ({ data }: { data?: number }) => {
  const [activeCate, setActiveCate] = useState<boolean>(true);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);

  const router = useRouter();

  // 회차 표시는 프론트에서 처리
  const episodes = [
    {
      id: 0,
      commentNum: 20,
      createDate: "2025.02.03",
    },
    {
      id: 1,
      commentNum: 10,
      createDate: "2025.02.05",
    },
    {
      id: 2,
      commentNum: 15,
      createDate: "2025.02.06",
    },
    {
      id: 3,
      commentNum: 8,
      createDate: "2025.02.06",
    },
    {
      id: 4,
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
    <NovelEpisodeStyled className={clsx("novelEpisode-wrap")}>
      <div className="novelEpisode-info-box">
        <div className="novelEpisode-title">
          작품 회차 <span className="novelEpisode-num">({episode.length})</span>
        </div>
        <ul className="novelEpisode-sort">
          <li>
            <button
              onClick={() => {
                handleSort(!activeCate);
              }}
              className={`novelEpisode-btn ${
                activeCate === true ? "active" : ""
              }`}
            >
              최신순
            </button>
          </li>
          <li className="novelEpisode-one">
            <button
              onClick={() => {
                handleSort(!activeCate);
              }}
              className={`novelEpisode-btn-one ${
                activeCate === true ? "" : "active"
              }`}
            >
              1화부터
            </button>
          </li>
        </ul>
      </div>
      <ul>
        {episode.map((item: any, i: number) => (
          <li
            onClick={() => {
              router.push(
                `/chapter/${
                  activeCate === true ? item.id : episode.length - (item.id + 1)
                }`
              );
            }}
            className="novelEpisode-list"
            key={i}
          >
            <Episode
              item={item}
              index={activeCate === true ? i + 1 : episode.length - i}
            />
          </li>
        ))}
      </ul>
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
