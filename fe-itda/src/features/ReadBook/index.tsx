import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import clsx from "clsx";
import { ReadBookStyled } from "./styled";
import api from "@/utill/api";
import WriterProfile from "@/features/WriterProfile";
import profileStatic from "@/assets/images/img_profile_static.svg";
import { useRouter } from "next/router";
import {
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { App as AntdApp } from "antd";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useNav } from "@/context/NavContext";
import list from "@/assets/images/list.svg";

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
  isPublished: boolean;
  novelTitle: string;
  likesCount: number;

  prevChapterId?: number | null; // 이전화 chapterId
  nextChapterId?: number | null; // 다음화 chapterId
};

interface ReadBookProps {
  novelId: number;
  chapterId: number;
}

const ReadBook = ({ novelId, chapterId }: ReadBookProps) => {
  const [liked, setLiked] = useState(false);
  const [episode, setEpisode] = useState<ChapterResponse>();
  const { message } = AntdApp.useApp();
  const { isNavVisible } = useNav();

  const router = useRouter();
  const currentChapterId = Number(router.query.id);
  const user = useAppSelector((state) => state.auth.user);

  // 프로필 이미지
  const profileImageSrc = user?.profile_img
    ? `http://localhost:5001/uploads/profiles/${user.profile_img}`
    : profileStatic;

  // 읽을 소설 불러오기 요청 & liked 초기값 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ChapterResponse>(
          `/chapters/content/${novelId}/${chapterId}`
        );

        setEpisode(response.data);
        setLiked(response.data.likesCount !== 0);
      } catch (error) {
        console.error("콘텐츠 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [novelId, chapterId]);

  // 하트 클릭
  const toggleLike = async () => {
    if (!user) {
      message.warning("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const res = await api.patch(`/likes/novel/${novelId}/toggle`);
      const isNowLiked = res.data.liked;
      const newLikesCount = res.data.likeCount;

      setLiked(isNowLiked);

      // 좋아요 개수도 업데이트
      setEpisode((prev) =>
        prev ? { ...prev, likesCount: newLikesCount } : prev
      );
    } catch (error) {
      console.error("좋아요 상태 변경 실패", error);
      message.error("좋아요 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      {/* 화면 클릭 확인 후 헤더 보이기 */}
      <div
        className="readbook-nav-box"
        onClick={(e) => {
          e.stopPropagation(); //이벤트 버블링 막기
        }}
      >
        {isNavVisible && (
          <div className="readbook-nav">
            <div className="readbook-list">
              {/* 목록보기 */}
              <span
                className="readbook-home"
                onClick={async () => {
                  await router.push(`/noveldetail/novelcheck/${novelId}`);
                }}
              >
                <Image src={list} alt="목록보기" />
                {/* 목록보기 */}
              </span>

              {/* 소설 제목 */}
              <span className="readbook-noveltitle">{episode?.novelTitle}</span>

              {/* 회차 */}
              <span className="readbook-novelnumber">
                {episode?.chapterNumber}화
              </span>

              {/* 소설 좋아요 */}
              <div className="novelinfo-like-box" onClick={toggleLike}>
                {liked ? (
                  <HeartFilled style={{ fontSize: "20px", color: "red" }} />
                ) : (
                  <HeartOutlined style={{ fontSize: "20px" }} />
                )}
              </div>
            </div>

            {/* 내정보 이미지 */}
            <div className="novelinfo-profile" style={{ cursor: "pointer" }}>
              <Image
                onClick={() => {
                  router.push("/mypage");
                }}
                src={profileImageSrc}
                alt="유저 이미지"
                width={25}
                height={25}
                className="novelinfo-image-wrap"
              />
            </div>
          </div>
        )}
      </div>

      <div className="readbook-page-box">
        {/* 이전화 다음화 */}
        {isNavVisible && (
          <>
            {/* 이전화 */}
            <LeftOutlined
              className="chapter-button prev"
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 방지
                if (chapterId > 1) {
                  router.push(`/chapter/${novelId}/${episode?.prevChapterId}`);
                } else {
                  message.info("첫 번째 회차입니다.");
                }
              }}
            />

            {/* 다음화 */}
            <RightOutlined
              className="chapter-button next"
              onClick={(e) => {
                e.stopPropagation();
                if (!episode?.isLastChapter) {
                  router.push(`/chapter/${novelId}/${episode?.nextChapterId}`);
                } else {
                  message.info("마지막 회차입니다.");
                }
              }}
            />
          </>
        )}

        {/* 소설 내용 */}
        <div className="readbook-page full">
          {episode?.slides.map((content, idx) => (
            <div key={idx} className="readbook-chapnum">
              {/* 회차 번호 */}
              {episode?.chapterNumber !== null && idx === 0 && (
                <div className="chapter-number">{episode?.chapterNumber}화</div>
              )}
              <div className="chapter-text">{content.text}</div>
              <br />
              <br />
            </div>
          ))}
        </div>

        {/* 작가 */}
        {episode?.writerId !== null && (
          <WriterProfile
            nickname={episode?.authorNickname}
            writerId={episode?.writerId}
            novelId={novelId}
            chapterId={chapterId}
          />
        )}
      </div>

      {/* 반응형일때 푸터 */}
      {isNavVisible && episode && (
        <div
          className="footer-nav"
          onClick={(e) => {
            e.stopPropagation(); //이벤트 버블링 막기
          }}
        >
          {/* 하트 */}
          <div onClick={toggleLike} className="heart">
            {liked ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )}
          </div>

          <div>
            {/* 이전화 */}
            <LeftOutlined
              className="arrow"
              onClick={() => {
                if (chapterId > 1) {
                  router.push(`/chapter/${novelId}/${episode?.prevChapterId}`);
                } else {
                  message.info("첫 번째 회차입니다.");
                }
              }}
            />

            {/* 다음화 */}
            <RightOutlined
              className="arrow"
              onClick={() => {
                if (!episode.isLastChapter) {
                  router.push(`/chapter/${novelId}/${episode?.nextChapterId}`);
                } else {
                  message.info("마지막 회차입니다.");
                }
              }}
            />
          </div>
        </div>
      )}
    </ReadBookStyled>
  );
};

export default ReadBook;
