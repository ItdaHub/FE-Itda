import { useState } from "react";
import { WriteCommentStyled } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import api from "@/utill/api";
import { useAppSelector } from "../../store/hooks";

const WriteComment = ({
  novelId,
  chapterId,
  parentId, // ✅ 대댓글일 경우 부모 댓글 ID
  refreshComments,
  onWriteComplete, // ✅ 대댓글 작성 후 실행될 콜백
}: {
  novelId?: number;
  chapterId?: number;
  parentId?: number;
  refreshComments?: () => void;
  onWriteComplete?: () => void;
}) => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  // 작성 댓글 내용
  const [comment, setComment] = useState<string>("");

  // 작성 댓글 글자수
  const [writeNum, setWriteNum] = useState<number>(0);

  // focus여부
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 댓글쓰기 axios요청
  const postMyComment = async () => {
    // 댓글이 없으면 요청 x
    if (writeNum < 1) return;

    try {
      const response = await api.post("/comments", {
        userId: user?.id,
        content: comment,
        novelId,
        chapterId,
        parentId, // 대댓글일 경우 포함됨
      });
      console.log("댓글 작성 성공:", response.data);

      setComment("");
      setWriteNum(0);

      refreshComments?.(); // 목록 새로고침
      onWriteComplete?.(); // 부모 댓글 열기 처리
    } catch (e) {
      console.error("댓글 작성 실패:", e);
    }
  };

  return (
    <WriteCommentStyled className="writeComment-wrap">
      <div className="writeComment-mycomment">
        <div className="writeComment-nick">{user?.nickname}</div>
        <div>
          <div
            className={`writeComment-write-box ${isFocused ? "focused" : ""}`}
          >
            <textarea
              value={comment}
              className="writeComment-write"
              style={{ width: "100%", height: "100%", resize: "none" }}
              placeholder={
                isFocused
                  ? "주제와 무관한 댓글, 악플은 삭제될 수 있습니다."
                  : "댓글을 입력해 주세요."
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setComment(e.target.value);
                setWriteNum(e.target.value.length);
              }}
              maxLength={99}
            ></textarea>
          </div>
          <div className="writeComment-numbox">
            <div className="writeComment-number">{writeNum} / 100</div>
            <div
              onClick={postMyComment}
              className={`writeComment-sendbox ${
                writeNum < 1 ? "" : "changeColor"
              }`}
            >
              <SendOutlined style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </WriteCommentStyled>
  );
};

export default WriteComment;
