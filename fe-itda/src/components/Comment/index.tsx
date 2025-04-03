import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { CommentStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import { Dropdown, MenuProps } from "antd";
import Swal from "sweetalert2";

const Comment = ({ item }: { item?: any }) => {
  const [isLiked, setIsLiked] = useState(item.isliked);
  const [likeCount, setLikeCount] = useState(item.likeNum);

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
        // await axios.post("/api/unlike", {
        //   commentId: item.id,
        //   userId: userId,
        // });
        setLikeCount((prev: number) => prev - 1);
      } else {
        // 좋아요 추가 요청
        // await axios.post("/api/like", {
        //   commentId: item.id,
        //   userId: userId,
        // });
        setLikeCount((prev: number) => prev + 1);
      }

      // 상태 변경
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const deleteComment = async () => {
    Swal.fire({
      icon: "question",
      title: "삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // axios 댓글 삭제 요청
          await axios.delete(`/delete/comment/${item.id}`);
        } catch (e) {
          console.error("댓글 삭제 실패: ", e);
          Swal.fire("댓글 삭제에 실패했습니다.");
        }
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={deleteComment}>삭제</div>,
      key: "0",
    },
  ];

  return (
    <CommentStyled className="comment-wrap">
      <div>
        <div className="comment-more">
          <div className="comment-writer">{item.writer}</div>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <div className="more">
                <MoreOutlined />
              </div>
            </a>
          </Dropdown>
        </div>
        <div className="comment-date">{item.date}</div>
        <div className="comment-comment">{item.comment}</div>
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
    </CommentStyled>
  );
};

export default Comment;
