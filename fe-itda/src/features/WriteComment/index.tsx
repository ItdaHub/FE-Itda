import { useState } from "react";
import { WriteCommentStyled } from "./styled";
import { SendOutlined } from "@ant-design/icons";

const WriteComment = ({ novelId }: { novelId: number }) => {
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
      // const response = await axios.post("/api/comments", {
      //   userId, // 유저 ID
      //   comment, // 댓글 내용
      //    novelId, // 작품 ID
      // });
      // console.log("댓글 작성 성공:", response.data);
      // setComment(""); // 댓글 초기화
      // setWriteNum(0);
    } catch (e) {
      console.error("댓글 작성 실패:", e);
    }
  };

  return (
    <WriteCommentStyled className="writeComment-wrap">
      <div className="writeComment-mycomment">
        <div className="writeComment-nick">닉네임</div>
        <div>
          <div
            className={`writeComment-write-box ${isFocused ? "focused" : ""}`}
          >
            <textarea
              defaultValue={comment}
              className="writeComment-write"
              style={{ width: "100%", height: "100%", resize: "none" }}
              placeholder={
                isFocused
                  ? "주제와 무관한 댓글, 악플은 삭제될 수 있습니다."
                  : "댓글을 입력해 주세요."
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setWriteNum(e.target.value.length)}
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
