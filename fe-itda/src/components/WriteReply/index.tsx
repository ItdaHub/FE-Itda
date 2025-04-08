import { Input, message } from "antd";
import { WriteReplyStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

const WriteReply = ({
  isVisible,
  setIsVisible,
  parentId,
}: {
  isVisible: boolean;
  setIsVisible: any;
  parentId: number;
}) => {
  // 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const [content, setContent] = useState("");

  const postReply = async () => {
    // axios post요청 - 대댓글 작성하기
    try {
      const response = await api.post("/comments/reply", {
        parentId, // 부모댓글 아이디
        content, // 내용
        userId: user?.id, // 로그인한 유저 아이디
      });

      if (response.data) {
        setContent(""); // 입력 초기화
        setIsVisible(false); // 닫기
        message.success("답글이 등록되었습니다!");
      }
    } catch (e) {
      console.error("대댓글 추가 실패: ", e);
    }
  };

  return (
    <WriteReplyStyled className={clsx("reply-wrap")}>
      <Input
        variant="underlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="reply-btn">
        <div
          className="reply-cancel"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          취소
        </div>
        <button
          className="reply-reply"
          onClick={postReply}
          disabled={!content.trim()}
        >
          답글
        </button>
      </div>
    </WriteReplyStyled>
  );
};

export default WriteReply;
