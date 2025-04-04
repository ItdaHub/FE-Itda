import clsx from "clsx";
import { NovelCommentStyled } from "./styled";
import { InfoCircleFilled, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Popover } from "antd";
import WriteComment from "../WriteComment";
import axios from "axios";
import Comment from "@/components/Comment";

interface ReviewType {
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

const NovelComments = ({ data }: { data?: number }) => {
  // 댓글 목록 저장
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const review = [
    {
      id: 1,
      writerId: 1,
      writer: "김강",
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
  ];

  // 해당 작품 댓글 목록 가져오는 axios요청
  useEffect(() => {
    const fetchReviews = async () => {
      if (!data) return;

      try {
        // const response = await axios.get(`/api/comments/${data}`);
        // setReviews(response.data);
        setReviews(review);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <NovelCommentStyled className={clsx("novelComment-wrap")}>
      {/* 댓글 개수 */}
      <div className="novelComment-review">
        <div className="novelComment-review-title">
          작품리뷰 {review.length}
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
      <WriteComment novelId={Number(data)} />

      {/* 댓글 목록 */}
      <ul>
        {reviews.map((item, i) => (
          <>
            <li key={i}>
              <Comment item={item} />
            </li>
            <div className={i + 1 !== review.length ? "stick" : ""}></div>
          </>
        ))}
      </ul>
    </NovelCommentStyled>
  );
};

export default NovelComments;
