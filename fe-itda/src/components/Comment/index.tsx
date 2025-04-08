import { LikeFilled, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { CommentStyled } from "./styled";
import { useState } from "react";
import { Dropdown, Input, MenuProps, message } from "antd";
import Swal from "sweetalert2";
import api from "@/utill/api";
import { useAppSelector } from "../../store/hooks";
import Modal from "antd/es/modal/Modal";
import WriteReply from "../WriteReply";

// API 응답 타입 정의
interface ReportResponse {
  data: {
    success: boolean;
  };
}
const Comment = ({ item, type }: { item?: any; type?: string }) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);
  const [isLiked, setIsLiked] = useState(item.isliked);
  const [likeCount, setLikeCount] = useState(item.likeNum);
  const [isVisible, setIsVisible] = useState(false);

  // const comments = item.filter(
  //   (comment: { parentId: null }) => comment.parentId === null
  // );
  // const commentReplies = item.filter(
  //   (comment: { parentId: null }) => comment.parentId !== null
  // );

  // 모달 상태 관리
  const [declareModalOpen, setDeclareModalOpen] = useState(false); // 신고 모달 열림 여부
  const [reportReason, setReportReason] = useState(""); // 신고 사유 상태

  // 신고 모달 띄우기
  const OpenModal = () => {
    setDeclareModalOpen(true);
    setReportReason(""); // 모달 닫기 시 신고 사유 초기화
  };

  // 신고 제출 핸들러
  const handleReportSubmit = async () => {
    if (!reportReason) {
      message.error("신고 사유를 입력해주세요.");
      return;
    }

    // 신고하기 요청
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
          console.log("신고 요청 전:", { reason: reportReason }); // 요청 전 로그

          // axios 댓글 신고 요청(해당 댓글의 id)
          const response = await api.post(`/comments/declare/${item.id}`, {
            reason: reportReason,
          });

          // 응답 확인
          console.log("서버 응답:", response);

          message.success("신고가 완료되었습니다.");
          setDeclareModalOpen(false); // 신고 후 모달 닫기

          // // 임의로 API 응답을 시뮬레이션 (모의 응답)
          // const mockResponse = new Promise<ReportResponse>((resolve) => {
          //   setTimeout(() => {
          //     resolve({ data: { success: true } });
          //   }, 1000);
          // });

          // const response: ReportResponse = await mockResponse; // 타입을 명시적으로 지정
          // console.log("서버 응답:", response);

          // if (response.data.success) {
          //   message.success("신고가 완료되었습니다.");
          //   setDeclareModalOpen(false);
          // } else {
          //   message.error("신고 처리에 실패했습니다.");
          // }
        } catch (e) {
          console.error("댓글 신고 실패: ", e);
          Swal.fire("댓글 신고에 실패했습니다.");
        }
      }
    });
  };

  // 모달 취소 핸들러
  const CloseModal = () => {
    setDeclareModalOpen(false); // 모달 닫기
    setReportReason(""); // 모달 닫기 시 신고 사유 초기화
  };

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

  // // 신고하기 요청
  // const declareComment = async () => {
  //   Swal.fire({
  //     icon: "question",
  //     title: "신고하시겠습니까?",
  //     showCancelButton: true,
  //     confirmButtonText: "예",
  //     cancelButtonText: "아니오",
  //     confirmButtonColor: "#429f50",
  //     cancelButtonColor: "#d33",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         // axios 댓글 신고 요청(해당 댓글의 id)
  //         await api.post(`/comments/declare/${item.id}`);
  //         message.success("신고되었습니다.");
  //       } catch (e) {
  //         console.error("댓글 신고 실패: ", e);
  //         Swal.fire("댓글 신고에 실패했습니다.");
  //       }
  //     }
  //   });
  // };

  const itemDelete: MenuProps["items"] = [
    {
      label: <div onClick={deleteComment}>삭제</div>,
      key: "0",
    },
  ];

  const itemDeclare: MenuProps["items"] = [
    {
      label: <div onClick={OpenModal}>신고</div>,
      key: "1",
    },
  ];

  return (
    <CommentStyled className="comment-wrap">
      <div className={type === "parent" ? "" : "reply-box"}>
        <div className="comment-more">
          <div className="comment-writer">{item.writer}</div>
          <Dropdown
            menu={{
              items: user?.id === item.writerId ? itemDelete : itemDeclare,
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
        {isVisible ? (
          <>
            <WriteReply
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              parentId={item.id}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      {/* 신고 모달 */}
      <Modal
        title="댓글 신고"
        open={declareModalOpen}
        onOk={handleReportSubmit} // 신고하기 버튼 클릭 시 제출
        onCancel={CloseModal} // 취소 버튼 클릭 시 모달 닫기
        okText="신고하기"
        cancelText="취소"
        centered
      >
        <div>
          <Input.TextArea
            rows={4}
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)} // 신고 사유 입력
            placeholder="신고 사유를 입력해주세요."
          />
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            ! 불법적인 내용이거나, 서비스 이용 목적에 부합하지 않는 댓글을
            신고해주세요. 신고하신 댓글은 운영정책에 따라 처리되며, 허위 신고시
            이용에 제한을 받을 수 있습니다.
          </div>
        </div>
        {/* <button>등록하기</button> */}
      </Modal>
    </CommentStyled>
  );
};

export default Comment;
