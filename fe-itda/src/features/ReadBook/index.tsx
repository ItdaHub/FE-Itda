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
  novelId,
  chapterId,
  isFromPaidClick = false,
}: {
  novelId: number;
  chapterId: number;
  isFromPaidClick?: boolean;
}) => {
  console.log(chapterId);
  const [contentList, setContentList] = useState<Content[]>([]); // 챕터 콘텐츠 리스트
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 페이지 인덱스
  const swiperRef = useRef<SwiperCore>(); // Swiper 인스턴스 참조
  const ignoreNextSlide = useRef(false); // 자동 슬라이드 이동 무시 여부

  // 유료 콘텐츠인지 판단하는 함수 (index가 4 이상이면 유료)
  const isPaidContent = (index: number) => index >= 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 소설 ID와 챕터 ID를 기반으로 내용 불러오기
        // const response = await api.get(`/chapters/content`, {
        //   params: {
        //     novelId,
        //     chapterId,
        //   },
        // });
        // console.log(response.data);

        // setContentList(response.data);

        //테스트 데이터 사용
        setContentList(testData);

        // 챕터 ID와 일치하는 콘텐츠 인덱스를 찾음
        // const matchedIndex = data.findIndex((item) => item.index === chapterId);
        const matchedIndex = testData.findIndex(
          (item) => item.index === chapterId
        );

        // 유료 클릭이고 해당 콘텐츠가 유료일 경우 처음부터 보여주기
        const displayIndex =
          isFromPaidClick && isPaidContent(matchedIndex) ? 0 : matchedIndex;

        setCurrentIndex(displayIndex);

        // Swiper를 해당 인덱스로 이동 (처음 진입 시 슬라이드 이동 방지)
        if (swiperRef.current) {
          ignoreNextSlide.current = true;
          swiperRef.current.slideTo(displayIndex);
        }

        // 유료 콘텐츠 접근 시 경고 메시지 출력 가능
        // if (isFromPaidClick && isPaidContent(matchedIndex)) {
        //   alert("유료 화입니다. 결제 후 열람 가능합니다.");
        // }
      } catch (error) {
        console.error("콘텐츠 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [novelId, chapterId, isFromPaidClick]);

  // 슬라이드 변경 시 호출되는 함수
  const handleSlideChange = (swiper: SwiperCore) => {
    // 자동 슬라이드 이동 무시 플래그 체크
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
