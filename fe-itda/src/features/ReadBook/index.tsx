import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import clsx from "clsx";
import { ReadBookStyled } from "./styled";
import api from "@/utill/api";

type Content = {
  text: string;
  index: number;
};

const testData: Content[] = [
  { index: 0, text: "어느 날 갑자기, 세계가 멸망했다..." },
  { index: 1, text: "주인공은 눈을 떴다. 낯선 곳이었다." },
  { index: 2, text: "여... 여긴 어디지..?" },
  { index: 3, text: "그는 결심했다. 반드시 살아남겠다고." },
  { index: 4, text: "그날, 나는 그를 처음 만났다." },
  { index: 5, text: "나도 확인해보고 싶어" },
  { index: 6, text: "좋아 그렇게 해" },
];

const ReadBook = ({
  chapterId,
  isFromPaidClick = false,
}: {
  chapterId: number;
  isFromPaidClick?: boolean;
}) => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperCore>();
  const ignoreNextSlide = useRef(false);

  const isPaidContent = (index: number) => index >= 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 해당 챕터의 내용 불러오기
        // const response = await api.get(`/chapters/content/${chapterId}`);
        // console.log(response.data);

        // setContentList(response.data);
        setContentList(testData);

        // const matchedIndex = data.findIndex((item) => item.index === chapterId);
        const matchedIndex = testData.findIndex(
          (item) => item.index === chapterId
        );
        const displayIndex =
          isFromPaidClick && isPaidContent(matchedIndex) ? 0 : matchedIndex;

        setCurrentIndex(displayIndex);

        if (swiperRef.current) {
          ignoreNextSlide.current = true;
          swiperRef.current.slideTo(displayIndex);
        }

        // if (isFromPaidClick && isPaidContent(matchedIndex)) {
        //   alert("유료 화입니다. 결제 후 열람 가능합니다.");
        // }
      } catch (error) {
        console.error("콘텐츠 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [chapterId, isFromPaidClick]);

  const handleSlideChange = (swiper: SwiperCore) => {
    if (ignoreNextSlide.current) {
      ignoreNextSlide.current = false;
      return;
    }

    const nextIndex = swiper.activeIndex;
    // if (isPaidContent(nextIndex)) {
    //   alert("유료 화입니다. 결제 후 열람 가능합니다.");
    //   setTimeout(() => swiper.slideTo(currentIndex), 0);
    // } else {
    //   setCurrentIndex(nextIndex);
    // }
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
              <div className="readbook-book" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </ReadBookStyled>
  );
};

export default ReadBook;
