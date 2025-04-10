import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { CommentStyled } from "./styled";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import MoreDropDown from "../MoreDropDown";

// API 응답 타입 정의
interface ReportResponse {
  data: {
    success: boolean;
  };
}
const Comment = ({ item, type }: { item?: any; type?: string }) => {
  const [isLiked, setIsLiked] = useState(item.isliked);
  const [likeCount, setLikeCount] = useState(item.likeNum);
  const [isVisible, setIsVisible] = useState(false);

  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  // const comments = item.filter(
  //   (comment: { parentId: null }) => comment.parentId === null
  // );
  // const commentReplies = item.filter(
  //   (comment: { parentId: null }) => comment.parentId !== null
  // );

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소 요청
        // await api.delete(`/likes/comment/${user.id}/${item.id}`);
        setLikeCount((prev: number) => prev - 1);
      } else {
        // 좋아요 추가 요청
        // await api.post(`/likes/comment/${user.id}/${item.id}`);
        setLikeCount((prev: number) => prev + 1);
      }

      // 상태 변경
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <CommentStyled className="comment-wrap">
      <div className={type === "parent" ? "" : "reply-box"}>
        <div className="comment-more">
          <div className="comment-writer">{item.writer}</div>
          {/* 신고 or 댓글 드롭다운 */}
          <MoreDropDown
            // 로그인한 유저
            user={user}
            setIsVisible={setIsVisible}
            item={item}
            isVisible={isVisible}
          />
        </div>
        <div className="comment-date">{item.date}</div>
        <div className="comment-comment">{item.comment}</div>
        <div className="comment-likebox">
          <div>
            {type === "parent" ? (
              <div
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
                className="comment-reply-btn"
              >
                <span>답글</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="comment-like">
            <button onClick={handleLikeClick}>
              {isLiked ? (
                <LikeFilled style={{ color: "#c47ad7" }} />
              ) : (
                <LikeOutlined />
              )}
              <span> {likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </CommentStyled>
  );
};

export default Comment;
