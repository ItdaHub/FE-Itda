import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { CommentStyled } from "./styled";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import MoreDropDown from "../MoreDropDown";
import api from "@/utill/api";
import WriteReply from "../WriteReply";

interface CommentProps {
  item: {
    id: number;
    writer: string;
    date: string;
    comment: string;
    likeNum: number;
    isliked: boolean;
    [key: string]: any;
  };
  type?: "parent" | "child";
  novelId?: number;
  chapterId?: number;
  refreshComments?: () => Promise<void>;
}

const Comment = ({
  item,
  type,
  novelId,
  chapterId,
  refreshComments,
}: CommentProps) => {
  const [isLiked, setIsLiked] = useState(item.isliked);
  const [likeCount, setLikeCount] = useState(item.likeNum);
  const [isVisible, setIsVisible] = useState(false);

  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setIsLiked(item.isliked);
    setLikeCount(item.likeNum);
  }, [item]);

  // 좋아요 클릭
  const handleLikeClick = async () => {
    if (!user) {
      console.warn("로그인 후 좋아요 가능합니다.");

      return;
    }

    try {
      const res = await api.patch(`/likes/comment/${item.id}/toggle`);
      const newIsLiked = res.data.liked;

      setIsLiked(newIsLiked);
      setLikeCount((prev) => prev + (newIsLiked ? 1 : -1));
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);
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
            refreshComments={refreshComments}
            target_type="comment"
          />
        </div>
        <div className="comment-date">{item.date}</div>
        <div className="comment-comment">{item.comment}</div>
        <div className="comment-likebox">
          <div>
            {/* 부모 댓글 */}
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
          {/* 좋아요 */}
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
        {/* 자식 댓글 */}
        {isVisible ? (
          <>
            <WriteReply
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              parentId={item.id}
              refreshComments={refreshComments}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </CommentStyled>
  );
};

export default Comment;
