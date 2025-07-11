import clsx from "clsx";
import { NovelCommentStyled } from "./styled";
import { DownOutlined, InfoCircleFilled, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FloatButton, Popover } from "antd";
import WriteComment from "../WriteComment";
import Comment from "@/components/Comment";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import dayjs from "dayjs";

interface ReviewType {
  id: number;
  parentId: number | null;
  writer: string;
  date: string;
  comment: string;
  likeNum: number;
  isliked: boolean;
}

interface NovelComment {
  chapterId?: number;
  novelId?: number;
  type?: string;
}

const content = (
  <div style={{ color: "#a6a6a6", fontWeight: 700 }}>
    <p>좋아요 투표 비율이 높은 댓글입니다.</p>
    <p>비정상적인 방법으로 '좋아요' 수가 증가하거나 타인에게 불</p>
    <p>쾌감을 주는 경우, 예고없이 제외될 수 있습니다.</p>
  </div>
);

// 댓글
const NovelComments = ({ chapterId, novelId, type }: NovelComment) => {
  // 댓글 목록 저장
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [repliesVisible, setRepliesVisible] = useState<Record<number, boolean>>(
    {}
  );

  const user = useAppSelector((state) => state.auth.user);

  const toggleReplies = (parentId: number) => {
    setRepliesVisible((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const fetchReviews = async () => {
    try {
      let endpoint = "";
      if (type === "chapter") {
        // 챕터인경우
        if (!chapterId) {
          console.warn("chapter 타입인데 chapterId가 없습니다.");
          return;
        }
        endpoint = `/comments/chapter/${chapterId}`;
      } else {
        // 소설부분인 경우
        if (novelId === undefined || novelId === null) {
          console.warn("novel 타입인데 novelId가 없습니다.");
          return;
        }
        endpoint = `/comments/novel/${novelId}`;
      }

      const response = await api.get(endpoint, {
        params: { currentUserId: user?.id },
      });

      const mappedData: ReviewType[] = response.data.map((item: any) => {
        return {
          id: item.id,
          parentId: item.parentId ?? null,
          writer: item.writer,
          date: dayjs(item.date).isValid()
            ? dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")
            : "알 수 없음",
          comment: item.comment,
          likeNum: item.likeNum ?? 0,
          isliked: item.isliked ?? false,
        };
      });

      // 부모 댓글만 좋아요 순 + 최신순으로 정렬
      const sortedParents = mappedData
        .filter((item) => item.parentId === null)
        .sort((a, b) => {
          if (b.likeNum !== a.likeNum) {
            return b.likeNum - a.likeNum;
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

      // 대댓글은 기존 순서 유지
      const replies = mappedData.filter((item) => item.parentId !== null);

      setReviews([...sortedParents, ...replies]);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  // 댓글 불러오기 실행
  useEffect(() => {
    fetchReviews();
  }, [novelId, chapterId, type, user?.id]);

  return (
    <NovelCommentStyled className={clsx("novelComment-wrap")}>
      {/* 댓글 개수 */}
      <div className="novelComment-review">
        <div className="novelComment-review-title">
          {type === "chapter" ? "댓글" : "작품리뷰"}{" "}
          {reviews.filter((item) => item.parentId === null).length}
        </div>
        {/* 댓글 안내 */}
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
      <WriteComment
        novelId={novelId}
        chapterId={type === "chapter" ? chapterId : undefined}
        refreshComments={fetchReviews}
      />

      {/* 댓글 목록 */}
      <ul>
        {reviews
          .filter((item) => item.parentId === null)
          .map((parent, i, filteredParents) => {
            const replies = reviews.filter(
              (reply) => reply.parentId === parent.id
            );
            const isVisible = repliesVisible[parent.id];
            return (
              <div key={parent.id}>
                <li>
                  <Comment
                    key={`${parent.id}-${parent.likeNum}-${parent.isliked}`}
                    item={parent}
                    type="parent"
                    chapterId={chapterId}
                    novelId={novelId}
                    refreshComments={fetchReviews}
                  />

                  {/* 대댓글 보기 토글 */}
                  {replies.length > 0 && (
                    <div
                      className="novelComment-reply"
                      onClick={() => toggleReplies(parent.id)}
                    >
                      {isVisible ? (
                        <>
                          <UpOutlined />
                          <span>답글 숨기기</span>
                        </>
                      ) : (
                        <>
                          <DownOutlined />
                          <span>댓글 {replies.length}개</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* 대댓글 리스트 */}
                  {isVisible && (
                    <ul className="replies">
                      {replies.map((reply) => (
                        <li key={reply.id}>
                          <Comment
                            key={`${reply.id}-${reply.likeNum}-${reply.isliked}`}
                            item={reply}
                            chapterId={chapterId}
                            novelId={novelId}
                            refreshComments={fetchReviews}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <div
                  className={i + 1 !== filteredParents.length ? "stick" : ""}
                ></div>
              </div>
            );
          })}
        <FloatButton.BackTop
          className="float-web"
          visibilityHeight={0}
          style={{ bottom: 80 }}
        />
      </ul>
    </NovelCommentStyled>
  );
};

export default NovelComments;
