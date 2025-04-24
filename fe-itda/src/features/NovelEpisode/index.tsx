import clsx from "clsx";
import { NovelEpisodeStyled } from "./styled";
import Episode from "../Episode";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useRouter } from "next/router";
import { App as AntdApp } from "antd";
import BuyChapterModal from "@/components/BuyChapterModal";
import { useAppSelector } from "@/store/hooks";

type EpisodeType = {
  id: number;
  chapter_number: number;
  commentNum: number;
  createDate: string;
  isPaid: boolean;
  isPublished: boolean;
};

interface DataProps {
  data?: any;
  novelTitle?: string;
}

const NovelEpisode = ({ data, novelTitle }: DataProps) => {
  const [selectedChapter, setSelectedChapter] = useState<{
    chapter_number: number;
    chapterId: number;
  } | null>(null);
  const [activeCate, setActiveCate] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  // 에피소드 가져오기 요청
  const getEpisode = async () => {
    if (!data) return;

    try {
      const res = await api.get(`/chapters/${data}`);
      setEpisode([...res.data].sort((a, b) => b.id - a.id));

      console.log("에피소드", res.data);
    } catch (e) {
      console.error("에피소드 가져오기 실패: ", e);
    }
  };

  useEffect(() => {
    getEpisode();
  }, [data]);

  // 상태 초기화
  useEffect(() => {
    setModalOpen(false);
    setSelectedChapter(null);
  }, [router.asPath]);

  // 1화+최신순 정렬
  const handleSort = (isLatest: boolean) => {
    const sorted = [...episode].sort((a, b) =>
      isLatest ? a.id - b.id : b.id - a.id
    );
    setEpisode(sorted);
    setActiveCate(isLatest);
  };

  // 유료여부 axios 요청
  const getIsPaid = async (novelId: number, chapterId: number) => {
    try {
      const res = await api.get(`chapters/${novelId}/popcorn`, {
        params: { chapterId },
      });
      return res.data.isPaid;
    } catch (e) {
      console.error("유료 여부 요청 실패: ", e);
      return true;
    }
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
          const handleClick = async (item: EpisodeType) => {
            if (!user) {
              router.push("/login");
              return;
            }

            // novelId, chapterId
            const isPaid = await getIsPaid(data, item.id);

            if (item.isPublished && isPaid) {
              setSelectedChapter({
                chapter_number: item.chapter_number,
                chapterId: item.id,
              });
              setModalOpen(true);
            } else {
              // 무료인 경우
              router.push(
                `/chapter/${item.chapter_number}?novelId=${data}&chapterId=${item.id}`
              );
            }
          };

          return (
            <li
              onClick={() => handleClick(item)}
              className="novelEpisode-list"
              key={item.id}
            >
              <Episode item={item} />
            </li>
          );
        })}
      </ul>
      {modalOpen && selectedChapter && (
        <BuyChapterModal
          novelId={data}
          chapterId={selectedChapter.chapterId}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          chapter={selectedChapter.chapter_number}
          novelTitle={novelTitle}
        />
      )}
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
