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

  // 사용자가 결제한 회차 목록 가져오기
  const getUserPurchasedChapters = async (novelId: number) => {
    if (!user) {
      console.error("사용자가 로그인하지 않았습니다.");
      return []; // 사용자 로그인하지 않으면 빈 배열 반환
    }

    try {
      const res = await api.get(`/popcorn/purchases/${user.id}`, {
        params: { novelId },
      });
      return res.data; // 결제한 회차 목록
    } catch (e) {
      console.error("결제 내역 가져오기 실패: ", e);
      return [];
    }
  };

  // 에피소드 가져오기 요청
  const getEpisode = async () => {
    if (!data) return;

    try {
      const res = await api.get(`/chapters/${data}`);
      setEpisode([...res.data].sort((a, b) => b.id - a.id));
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

  // 회차 클릭 시 처리
  const handleClick = async (item: EpisodeType) => {
    if (!user) {
      router.push("/login"); // 로그인 안 되어 있으면 로그인 페이지로 리디렉션
      return;
    }

    // isPublished가 false면 무료로 바로 접근 가능
    if (!item.isPublished) {
      router.push(`/chapter/${item.id}?novelId=${data}`);
      return;
    }

    // 첫 화는 무료로 보여준다
    if (item.chapter_number === 1) {
      router.push(`/chapter/${item.id}?novelId=${data}`);
      return;
    }

    // 사용자가 결제한 회차 목록을 받아옵니다.
    const purchasedChapters = await getUserPurchasedChapters(data);

    // 클릭한 회차가 결제된 회차인지 확인합니다.
    const isPaid = purchasedChapters.some(
      (chapter: any) => chapter.chapterId === item.id
    );

    // 결제된 회차라면 바로 해당 회차로 이동
    if (item.isPublished && isPaid) {
      router.push(`/chapter/${item.id}?novelId=${data}`);
    } else {
      // 결제되지 않은 회차라면 모달을 띄웁니다.
      setSelectedChapter({
        chapter_number: item.chapter_number,
        chapterId: item.id,
      });
      setModalOpen(true);
    }
  };

  return (
    <NovelEpisodeStyled className={clsx("novelEpisode-wrap")}>
      <div className="novelEpisode-info-box">
        <div className="novelEpisode-title">총 {episode.length}화</div>
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
            onClick={() => handleClick(item)}
            className="novelEpisode-list"
            key={item.id}
          >
            <Episode item={item} />
          </li>
        ))}
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
