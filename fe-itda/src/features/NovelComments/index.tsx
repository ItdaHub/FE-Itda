import clsx from "clsx";
import { NovelCommentStyled } from "./styled";
import {
  DownOutlined,
  InfoCircleFilled,
  SendOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Popover } from "antd";
import WriteComment from "../WriteComment";
import Comment from "@/components/Comment";
import api from "@/utill/api";
import { Collapse } from "antd";
import WriteReply from "@/components/WriteReply";

interface ReviewType {
  id: number;
  parentId?: any;
  writer: string;
  date: string;
  comment: string;
  likeNum: number;
  isliked: boolean;
}

const content = (
  <div style={{ color: "#a6a6a6", fontWeight: 700 }}>
    <p>좋아요 투표 비율이 높은 댓글입니다.</p>
    <p>비정상적인 방법으로 '좋아요' 수가 증가하거나 타인에게 불</p>
    <p>쾌감을 주는 경우, 예고없이 제외될 수 있습니다.</p>
  </div>
);

const NovelComments = ({
  chapterId,
  novelId,
  type,
}: {
  chapterId?: number;
  novelId?: number;
  type?: string;
}) => {
  // 댓글 목록 저장
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [repliesVisible, setRepliesVisible] = useState<Record<number, boolean>>(
    {}
  );

  const review = [
    {
      id: 1,
      writerId: 1,
      writer: "마우스",
      date: "2025.03.25",
      comment: "재밌다",
      likeNum: 5,
      isliked: false,
    },
    {
      id: 2,
      parentId: 1,
      writerId: 2,
      writer: "라라",
      date: "2025.03.25",
      comment: "다음편 궁금하네",
      likeNum: 8,
      isliked: true,
    },
    {
      id: 3,
      writerId: 1,
      writer: "마우스",
      date: "2025.03.27",
      comment: "오 뭐야",
      likeNum: 10,
      isliked: false,
    },
    {
      id: 4,
      writerId: 2,
      writer: "하하",
      date: "2025.03.31",
      comment: "시작부터 기대되넹~",
      likeNum: 1,
      isliked: false,
    },
    {
      id: 5,
      writerId: 20,
      writer: "하하",
      date: "2025.03.31",
      comment: "멍청이!",
      likeNum: 1,
      isliked: false,
    },
  ];

  const toggleReplies = (parentId: number) => {
    setRepliesVisible((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  // 해당 작품 댓글 목록 가져오는 axios요청
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 챕터면 해당 챕터의 id도 같이 보내줌
        // const response = await api.get(`/comments`, {
        //   params: {
        //     novelId,
        //     chapterId: type === "chapter" ? chapterId : undefined,
        //   },
        // });
        // setReviews(response.data);

        // 테스트용
        setReviews(review);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, [novelId, chapterId]);

  return (
    <NovelCommentStyled className={clsx("novelComment-wrap")}>
      {/* 댓글 개수 */}
      <div className="novelComment-review">
        <div className="novelComment-review-title">
          {type === "chapter" ? "댓글" : "작품리뷰"} {review.length}
        </div>
        <Popover
          placement="bottom"
          content={content}
          title={
            <span>
              <InfoCircleFilled
                style={{ fontSize: "16px", color: "#c9c9c9", marginRight: 5 }}
              />
              BEST댓글
            </span>
          }
        >
          <InfoCircleFilled style={{ fontSize: "16px", color: "#c9c9c9" }} />
        </Popover>
      </div>

      {/* 댓글 작성 */}
      <WriteComment novelId={Number(chapterId)} />

      {/* 댓글 목록 */}
      <ul>
        {reviews
          .filter((item) => !item.parentId)
          .map((parent, i) => {
            const replies = reviews.filter(
              (reply) => reply.parentId === parent.id
            );
            const isVisible = repliesVisible[parent.id];
            return (
              <div key={parent.id}>
                <li>
                  <Comment item={parent} type="parent" />

                  {/* 대댓글 보기 토글 */}
                  {replies.length > 0 && (
                    <div
                      className="novelComment-reply"
                      onClick={() => toggleReplies(parent.id)}
                    >
                      {isVisible ? (
                        <>
                          <UpOutlined />
                          <span>답글 숨기기</span>
                        </>
                      ) : (
                        <>
                          <DownOutlined />
                          <span>댓글 {replies.length}개</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* 대댓글 리스트 */}
                  {isVisible && (
                    <ul className="replies">
                      {replies.map((reply) => (
                        <li key={reply.id}>
                          <Comment item={reply} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <div
                  className={
                    i + 1 !== reviews.filter((item) => !item.parentId).length
                      ? "stick"
                      : ""
                  }
                ></div>
              </div>
            );
          })}
      </ul>
    </NovelCommentStyled>
  );
};

export default NovelComments;
