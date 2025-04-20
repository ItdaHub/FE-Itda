import clsx from "clsx";
import { NovelEpisodeStyled } from "./styled";
import Episode from "../Episode";
import { useEffect, useMemo, useState } from "react";
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
};

interface DataProps {
  data?: number;
  novelTitle?: string;
}

const NovelEpisode = ({ data, novelTitle }: DataProps) => {
  const { message } = AntdApp.useApp();
  const [selectedChapter, setSelectedChapter] = useState<any>();
  const [activeCate, setActiveCate] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodeType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const { isPublished } = router.query;

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

  // 유료여부 계산
  const paidChapterCount = useMemo(() => {
    return Math.floor((episode.length * 2) / 3);
  }, [episode]);

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
          // 2/3까지는 무료, 이후는 유료
          const isPaid = item.chapter_number > paidChapterCount;

          const handleClick = (item: EpisodeType) => {
            if (isPublished === "true" && isPaid) {
              if (!user) {
                router.push("/login");
              } else {
                setSelectedChapter(item.chapter_number);
                setModalOpen(true);
              }
              message.info("유료 회차입니다. 결제가 필요합니다.");
            } else {
              // 무료인 경우
              router.push(
                `/chapter/${item.id}?novelId=${data}&isPublished=${isPublished}`
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
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          chapter={selectedChapter}
          novelTitle={novelTitle}
        />
      )}
    </NovelEpisodeStyled>
  );
};

export default NovelEpisode;
