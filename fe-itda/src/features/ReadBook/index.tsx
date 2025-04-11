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

type Content = {
  text: string;
  index: number;
  isPaid?: boolean;
};

type ChapterResponse = {
  slides: Content[];
  authorNickname: string;
  writerId: number;
};

const ReadBook = ({
  novelId,
  chapterId,
  isFromPaidClick = false,
}: {
  novelId: number;
  chapterId: number;
  isFromPaidClick?: boolean;
}) => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [authorNickname, setAuthorNickname] = useState("");
  const [writerId, setWriterId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperRef = useRef<SwiperCore>();
  const ignoreNextSlide = useRef(false);

  const isPaidContent = (index: number) => {
    const content = contentList[index];
    return content?.isPaid;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ChapterResponse>(
          `/chapters/content/${novelId}/${chapterId}`
        );

        const { slides, authorNickname, writerId } = response.data;

        setContentList(slides);
        setAuthorNickname(authorNickname);
        setWriterId(writerId);

        const matchedIndex = slides.findIndex(
          (item) => item.index === chapterId
        );
        const displayIndex =
          isFromPaidClick && isPaidContent(matchedIndex) ? 0 : matchedIndex;

        setCurrentIndex(displayIndex);

        if (swiperRef.current) {
          ignoreNextSlide.current = true;
          swiperRef.current.slideTo(displayIndex);
        }

        if (isFromPaidClick && isPaidContent(matchedIndex)) {
          alert("유료 화입니다. 결제 후 열람 가능합니다.");
        }
      } catch (error) {
        console.error("콘텐츠 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [novelId, chapterId, isFromPaidClick]);

  const handleSlideChange = (swiper: SwiperCore) => {
    if (ignoreNextSlide.current) {
      ignoreNextSlide.current = false;
      return;
    }

    const nextIndex = swiper.activeIndex;

    if (isPaidContent(nextIndex)) {
      alert("유료 화입니다. 결제 후 열람 가능합니다.");
      swiper.slideTo(currentIndex);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        navigation
        allowTouchMove={true}
        initialSlide={currentIndex}
      >
        {contentList.map((content, idx) => (
          <SwiperSlide key={idx}>
            {!isPaidContent(idx) ? (
              <div className="readbook-book">
                <div className="readbook-page full">{content.text}</div>
              </div>
            ) : (
              <div className="readbook-book locked">
                <div className="readbook-page full">🔒 유료 콘텐츠입니다.</div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 작가 닉네임 */}
      {writerId !== null && (
        <WriterProfile nickname={authorNickname} writerId={writerId} />
      )}
    </ReadBookStyled>
  );
};

export default ReadBook;
