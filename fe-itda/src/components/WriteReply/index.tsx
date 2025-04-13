import { Input } from "antd";
import { WriteReplyStyled } from "./styled";
import clsx from "clsx";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { App as AntdApp } from "antd";

const WriteReply = ({
  isVisible,
  setIsVisible,
  parentId,
  refreshComments,
}: {
  isVisible: boolean;
  setIsVisible: any;
  parentId: number;
  refreshComments?: () => Promise<void>;
}) => {
  const { message } = AntdApp.useApp();

  // 유저 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const [content, setContent] = useState("");

  const postReply = async () => {
    // axios post요청 - 대댓글 작성하기
    try {
      const response = await api.post("/comments", {
        parentId, // 부모댓글 아이디
        content, // 내용
        userId: user?.id, // 로그인한 유저 아이디
      });

      if (response.data) {
        setContent(""); // 입력 초기화
        setIsVisible(false); // 닫기
        message.success("답글이 등록되었습니다!");
        refreshComments?.();
      }
    } catch (e) {
      console.error("대댓글 추가 실패: ", e);
    }
  };

  return (
    <WriteReplyStyled className={clsx("reply-wrap")}>
      <Input
        className="reply-place"
        variant="underlined"
        placeholder="답글을 작성해주세요"
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
          className={`reply-reply ${!content.trim() ? "" : "reply-pointer"}`}
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
