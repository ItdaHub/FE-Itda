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
  const [liked, setLiked] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const { message } = AntdApp.useApp();

  const router = useRouter();
  const currentChapterId = Number(router.query.id);
  const user = useAppSelector((state) => state.auth.user);

  // 프로필 이미지
  const profileImageSrc = user?.profile_img
    ? `http://localhost:5001/uploads/profiles/${user.profile_img}`
    : profileStatic;

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
          isPublished,
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

      setLiked(isNowLiked);
    } catch (error) {
      console.error("좋아요 상태 변경 실패", error);
      message.error("좋아요 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      <div className="readbook-nav">
        {/* 목록보기 */}
        <span
          className="readbook-home"
          onClick={async () => {
            await router.push(`/noveldetail/novelcheck/${novelId}`);
          }}
        >
          목록보기
        </span>

        {/* 회차 */}
        <span>{chapterNumber}화</span>

        {/* 소설 좋아요 */}
        <div className="novelinfo-like-box" onClick={toggleLike}>
          {liked ? (
            <HeartFilled style={{ fontSize: "30px", color: "red" }} />
          ) : (
            <HeartOutlined style={{ fontSize: "30px" }} />
          )}
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
