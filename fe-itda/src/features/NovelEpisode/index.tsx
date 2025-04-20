import clsx from "clsx";
import { NovelEpisodeStyled } from "./styled";
import Episode from "../Episode";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useRouter } from "next/router";
import PopcornModal from "@/components/PopcornModal";
import { App as AntdApp } from "antd";

type EpisodeType = {
  id: number;
  chapter_number: number;
  commentNum: number;
  createDate: string;
  isPaid: boolean;
};

interface DataProps {
  data?: number;
  isPublished?: string;
}

const NovelEpisode = ({ data, isPublished }: DataProps) => {
  const { message } = AntdApp.useApp();
  const [activeCate, setActiveCate] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  // 에피소드 가져오기 요청
  useEffect(() => {
    if (!data) return;

    const getEpisode = async () => {
      try {
        const res = await api.get(`/chapters/${data}`);
        setEpisode([...res.data].sort((a, b) => b.id - a.id));
        console.log("에피소드", res.data);
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
        {episode.map((item, i) => {
          // 전체 에피소드 수의 2/3을 계산
          const totalChapters = episode.length;
          const paidChapterCount = Math.floor((totalChapters * 2) / 3);

          // 2/3까지는 무료, 이후는 유료
          const isPaid = item.chapter_number > paidChapterCount;

          const handleClick = () => {
            console.log(isPublished);
            console.log(isPaid);
            if (isPublished === "true" && isPaid) {
              setModalOpen(true);
              // 유료일 경우
              message.info("유료 회차입니다. 결제가 필요합니다.");
            } else {
              // 무료일 경우 바로 이동
              router.push(`/chapter/${item.id}?novelId=${data}`);
            }
          };

          return (
            <li
              onClick={handleClick}
              className="novelEpisode-list"
              key={item.id}
            >
              <Episode item={item} />
            </li>
          );
        })}
      </ul>
      {modalOpen && (
        <PopcornModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
