import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { CommentStyled } from "./styled";
import { useState } from "react";
import { Dropdown, MenuProps, message } from "antd";
import Swal from "sweetalert2";
import api from "@/utill/api";
import { useAppSelector } from "../../../store/hooks";

const Comment = ({ item }: { item?: any }) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
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

  // 삭제하기 요청
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
          await api.delete(`/comments/${item.id}`);
        } catch (e) {
          console.error("댓글 삭제 실패: ", e);
          Swal.fire("댓글 삭제에 실패했습니다.");
        }
      }
    });
  };

  // 신고하기 요청
  const decareComment = async () => {
    Swal.fire({
      icon: "question",
      title: "신고하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // axios 댓글 신고 요청(해당 댓글의 id)
          await api.post(`/comments/declare/${item.id}`);
          message.success("신고되었습니다.");
        } catch (e) {
          console.error("댓글 신고 실패: ", e);
          Swal.fire("댓글 신고에 실패했습니다.");
        }
      }
    });
  };

  // 로그인한 사용자
  const userId = 1;

  const itemDelete: MenuProps["items"] = [
    {
      label: <div onClick={deleteComment}>삭제</div>,
      key: "0",
    },
  ];

  const itemDeclare: MenuProps["items"] = [
    {
      label: <div onClick={deleteComment}>신고</div>,
      key: "1",
    },
  ];

  return (
    <CommentStyled className="comment-wrap">
      <div>
        <div className="comment-more">
          <div className="comment-writer">{item.writer}</div>
          <Dropdown
            menu={{
              items: userId === item.writerId ? itemDelete : itemDeclare,
            }}
            trigger={["click"]}
          >
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
