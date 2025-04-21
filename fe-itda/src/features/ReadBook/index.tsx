import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import clsx from "clsx";
import { ReadBookStyled } from "./styled";
import api from "@/utill/api";
import WriterProfile from "@/features/WriterProfile";
import { useRouter } from "next/router";
import { LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { App as AntdApp } from "antd";

type Content = {
  text: string;
  index: number;
  isPaid?: boolean;
};

type ChapterResponse = {
  slides: Content[];
  authorNickname: string;
  writerId: number;
  chapterNumber: number;
  isLastChapter: boolean;
};

interface ReadBookProps {
  novelId: number;
  chapterId: number;
}

const ReadBook = ({ novelId, chapterId }: ReadBookProps) => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [authorNickname, setAuthorNickname] = useState("");
  const [writerId, setWriterId] = useState<number | null>(null);
  const [chapterNumber, setChapterNumber] = useState<number | null>(null); // 회차 정보 상태
  const [isLastChapter, setIsLastChapter] = useState(false); // 마지막 화 여부
  const [isDisabled, setIsDisabled] = useState(false);
  const { message } = AntdApp.useApp();

  const router = useRouter();
  const currentChapterId = Number(router.query.id);
  const { isPublished } = router.query;

  // 읽을 소설 불러오기 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ChapterResponse>(
          `/chapters/content/${novelId}/${chapterId}`
        );

        console.log("잘오고 있나??????", response.data);

        const {
          slides,
          authorNickname,
          writerId,
          chapterNumber,
          isLastChapter,
        } = response.data;

        // 내용
        setContentList(slides);
        // 작가
        setAuthorNickname(authorNickname);
        setWriterId(writerId);
        // 현재 회차
        setChapterNumber(chapterNumber);
        // 마지막 화 여부 상태
        setIsLastChapter(isLastChapter);
        // 1화면 버튼 비활성화
        setIsDisabled(chapterNumber === 1);

        const matchedIndex = slides.findIndex(
          (item) => item.index === chapterId
        );
      } catch (error) {
        console.error("콘텐츠 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [novelId, chapterId]);

  // 이전화
  const goToPrevChapter = () => {
    if (currentChapterId > 1) {
      chapterId = currentChapterId - 1;
      router.push({
        pathname: `/chapter/${currentChapterId - 1}`,
        query: {
          novelId,
          isPublished,
        },
      });
    }
  };

  // 다음화
  const goToNextChapter = () => {
    if (isLastChapter) {
      message.info("마지막화입니다");
    } else {
      router.push({
        pathname: `/chapter/${currentChapterId + 1}`,
        query: {
          novelId,
          isPublished,
        },
      });
    }
  };

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      <div className="readbook-nav">
        <span
          className="readbook-home"
          onClick={async () => {
            await router.push(
              `/noveldetail/novelcheck/${novelId}?isPublished=${isPublished}`
            );
          }}
        >
          목록보기
        </span>
        <div>
          <button
            onClick={goToPrevChapter}
            className="arrow prev"
            disabled={isDisabled}
          >
            <LeftOutlined /> 이전화
          </button>
          <span className="stick"></span>
          <button
            onClick={goToNextChapter}
            className={`arrow next ${isLastChapter ? "disabled" : ""}`}
          >
            다음화 <RightOutlined />
          </button>
        </div>
      </div>
      <div className="readbook-page full">
        {contentList.map((content, idx) => (
          <div key={idx} className="readbook-chapnum">
            {/* 회차 번호 */}
            {chapterNumber !== null && idx === 0 && (
              <div className="chapter-number">{chapterNumber}화</div>
            )}
            <div className="chapter-text">{content.text}</div>
            <br />
            <br />
          </div>
        ))}
      </div>

      {writerId !== null && (
        <WriterProfile
          nickname={authorNickname}
          writerId={writerId}
          novelId={novelId}
          chapterId={chapterId}
        />
      )}
    </ReadBookStyled>
  );
};

export default ReadBook;
