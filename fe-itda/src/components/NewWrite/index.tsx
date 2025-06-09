import clsx from "clsx";
import { NewWriteStyled } from "./styled";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "antd/es/input/TextArea";
import { InfoCircleFilled } from "@ant-design/icons";
import api from "@/utill/api";
import { App as AntdApp } from "antd";
import { Tooltip } from "antd";

const people = [
  { label: "5명", value: 5 },
  { label: "7명", value: 7 },
  { label: "9명", value: 9 },
];

interface NewWriteProps {
  type: "new" | "relay";
  titles?: string;
  genres?: string;
  novelId?: number;
}

const NewWrite = ({ type, titles, genres, novelId }: NewWriteProps) => {
  const { message } = AntdApp.useApp();
  const [categories, setCategories] = useState<object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [aiquestion, setAIquestion] = useState<string>("");
  const [aianswer, setAIanswer] = useState<string>("");
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);
  const [peopleNumber, setPeopleNumber] = useState<number | null>(null);
  const [showAIBox, setShowAIBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await api.get("/categories");
        const formattedGenres = response.data.map(
          (genre: { id: number; name: string }) => ({
            label: genre.name,
            value: genre.id,
          })
        );
        setCategories(formattedGenres);
      } catch (e) {
        console.error("카테고리 불러오기 실패: ", e);
      }
    };

    getGenre();
  }, []);

  useEffect(() => {
    const fetchOriginalNovel = async () => {
      if (type === "relay" && novelId) {
        try {
          const res = await api.get(`/novels/${novelId}`);
          const original = res.data;

          // 소설 상태가 completed면 진입 차단
          if (original.status === "COMPLETED") {
            message.warning("이미 완료된 소설입니다.");
            router.push("/");
            return;
          }

          const chapterRes = await api.get(`/novels/${novelId}/chapters`);
          const chapters = chapterRes.data;

          const sortedChapters = chapters.sort(
            (a: any, b: any) => a.chapterNumber - b.chapterNumber
          );

          const lastChapter = sortedChapters.at(-1);
          const lastChapterNumber = lastChapter?.chapterNumber ?? 0;
          const nextChapterNumber = lastChapterNumber + 1;

          // 인원 다 채워졌는지 확인
          if (original.peopleNum <= lastChapterNumber) {
            message.warning("모든 인원이 이미 참여하여 작성할 수 없습니다.");
            router.push("/");
            return;
          }

          setPeopleNumber(original.peopleNum);
          setChapterNumber(nextChapterNumber);
          setSelectedCategory(original.categoryId);
          setTitle(`제목 - ${nextChapterNumber}회차`);
          setContent("");
        } catch (e) {
          console.error("이어쓰기 원본 소설 불러오기 실패", e);
        }
      }
    };

    fetchOriginalNovel();
  }, [type, novelId]);

  const handleCategoryChange = (value: number) => {
    setSelectedCategory(value);
  };

  const handlePeopleChange = (value: number) => {
    setSelectedPeople(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAIquestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAIquestion(e.target.value);
  };

  const useAIanswer = () => {
    // 사용자가 '사용하기' 버튼을 클릭한 후에만 내용에 반영
    if (aianswer.trim()) {
      const trimmed = aianswer.trim();
      if (trimmed.length > 1500) {
        message.info("AI 응답이 1500자를 초과하여 일부만 사용됩니다.");
      }
      setContent(trimmed.slice(0, 1500));
    }
  };

  const handleAskAI = async () => {
    if (!aiquestion.trim()) {
      message.warning("AI에게 보낼 내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/ai/generate", {
        prompt: aiquestion,
      });

      console.log("AI 응답:", response.data);
      // AI 응답 받기
      setAIanswer(response.data.content || "AI의 응답이 없습니다.");
    } catch (error) {
      console.error("AI 요청 실패:", error);
      message.error("AI 응답을 받는 데 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 등록하기
  const handleSubmit = async () => {
    if (type === "new" && selectedCategory === null) {
      message.warning("카테고리를 선택해주세요.");
      return;
    }

    if (type === "new" && !selectedPeople) {
      message.warning("인원수를 선택해주세요.");
      return;
    }

    if (type === "new" && title.length < 1) {
      message.warning("제목을 1자 이상 입력해주세요.");
      return;
    }

    if (content.length < 10) {
      message.warning("내용을 10자 이상 입력해주세요.");
      return;
    }

    if (content.length > 300) {
      message.warning("내용을 300자 넘지않게 입력해주세요.");
      return;
    }

    console.log("현재 이어쓰는 챕터 번호:", chapterNumber);
    console.log("인워ㄴ수터 번호:", peopleNumber);

    console.log("제출 데이터:", {
      type,
      categoryId: selectedCategory,
      peopleNum: type === "new" ? selectedPeople : peopleNumber,
      title,
      content,
      chapterNumber,
    });

    try {
      // 첫화일 경우
      if (type === "new") {
        await api.post("/novels", {
          categoryId: selectedCategory,
          peopleNum: selectedPeople, // 첫화일 경우
          title,
          content,
          type: "new",
        });
      } else if (type === "relay" && novelId && chapterNumber !== null) {
        // 첫화가 아닐 경우
        try {
          await api.post(`/chapters/write/${novelId}`, {
            content,
            chapterNumber, // relay일 경우
          });
        } catch (e) {
          console.error("이어쓰기 실패: ", e);
        }

        // 현재 작성한 소설이 마지막화일 경우 관리자에게 출품 요청
        if (peopleNumber === chapterNumber) {
          console.log("관리자로 이동하자");

          try {
            // 출품 요청 API 호출
            await api.patch(`/novels/${novelId}/submit`);
          } catch (err: any) {
            console.error(
              "출품 요청 실패:",
              err.response?.data?.message || err.message
            );
            message.error(
              "출품 요청 중 문제가 발생했습니다. 관리자에게 문의해주세요."
            );
          }
        }
      }

      message.success("등록되었습니다.", 1, () => {
        router.push("/");
      });
    } catch (e: any) {
      console.error("등록 실패:", e);

      if (e.response?.status === 403) {
        message.warning("이미 이어쓰기에 참여하셨습니다!");
      } else {
        message.error("등록에 실패했습니다.");
      }
    }
  };

  // ai한테 물어보는 input보여주기
  const toggleAIBox = () => {
    setShowAIBox((prev) => !prev);
  };

  return (
    <NewWriteStyled className={clsx("newWrite-wrap")}>
      {type === "new" ? <h2>새로쓰기</h2> : <h2>이어쓰기</h2>}

      <div className="newWrite-box">
        <div
          className={`newWrite-right ${
            type === "new" ? "" : "newWrite-rightborder"
          }`}
        >
          <div className="newWrite-category-box">
            {type === "new" ? (
              <div className="newWrite-new">
                <div className="newWrite-title">
                  <Input
                    maxLength={10}
                    placeholder="제목은 10자 이내로 작성해주세요"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="newWrite-category">
                  <Select
                    value={selectedCategory}
                    style={{ width: 120 }}
                    onChange={handleCategoryChange}
                    options={categories}
                    placeholder="장르"
                    className="newWrite-genre-cate"
                  />
                  <Select
                    value={selectedPeople || undefined}
                    style={{ width: 120 }}
                    onChange={handlePeopleChange}
                    options={people}
                    placeholder="인원수"
                  />
                  <span className="newWrite-people-info">
                    <Tooltip title="같이 소설 이어쓰기할 인원수를 선택해주세요.">
                      <InfoCircleFilled
                        style={{
                          fontSize: "12px",
                          color: "#868686",
                          marginLeft: "3px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="newWrite-relay-genre">{genres}</div>
                <div className="newWrite-relay-title">{titles}</div>
                <div className="newWrite-chapter">
                  {chapterNumber !== null ? (
                    <div>현재 작성 중인 회차: {chapterNumber}회차</div>
                  ) : (
                    <div>회차 정보 불러오는 중...</div>
                  )}
                </div>
              </>
            )}

            <div className="newWrite-content">
              <TextArea
                showCount
                minLength={10}
                maxLength={1500}
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력해주세요(10~1500자)"
                defaultValue={content}
                style={{ height: 255, resize: "none" }}
              />

              <div className="newWrite-info-box">
                <div className="newWrite-info">
                  <div className="newWrite-info-icon">
                    <InfoCircleFilled
                      style={{ fontSize: "12px", color: "#acacac" }}
                    />
                  </div>
                  <div>
                    <div className="newWrite-info-one">수정, 삭제 불가!</div>
                    <div className="newWrite-info-two">
                      한번의 기회만 주어집니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {type === "new" && (
            <div className="newWrite-ai-toggle">
              <Button onClick={toggleAIBox}>
                {!showAIBox ? "AI로 작성해보기" : "AI 닫기"}
              </Button>
            </div>
          )}

          {type === "new" && showAIBox && (
            <div className="newWrite-ai">
              <div className="newWrite-content">
                <div className="newWrite-label">질문 (10~300자)</div>
                <TextArea
                  showCount
                  minLength={10}
                  maxLength={300}
                  value={aiquestion}
                  onChange={handleAIquestionChange}
                  placeholder="AI에게 첫내용을 추천받아보세요"
                  style={{ height: 80, resize: "none" }}
                />
                <Button
                  onClick={handleAskAI}
                  loading={isLoading}
                  className="newWrite-ai-btn"
                >
                  {isLoading ? "생성 중..." : "AI에게 물어보기"}
                </Button>
                {aianswer && (
                  <>
                    <div className="newWrite-label">
                      AI 답변 (수정 및 삭제 불가)
                    </div>
                    <TextArea
                      value={aianswer}
                      readOnly
                      placeholder="AI의 응답이 여기에 표시됩니다"
                      style={{ height: 200, resize: "none" }}
                    />
                    <Button className="newWrite-ai-btn" onClick={useAIanswer}>
                      이 내용 사용하기
                    </Button>
                  </>
                )}
              </div>

              {/* <div className="newWrite-content">
              <div className="newWrite-label">AI 답변 (수정 및 삭제 불가)</div>
              <TextArea
                value={aianswer}
                readOnly
                placeholder="AI의 응답이 여기에 표시됩니다"
                style={{ height: 200, resize: "none" }}
              />
              <Button
                onClick={useAIanswer}
                disabled={!aianswer}
                className="newWrite-ai-btn"
              >
                이 내용으로 작성하기
              </Button>
            </div> */}
            </div>
          )}
        </div>
      </div>

      <Button className="newWrite-btn" onClick={handleSubmit}>
        등록
      </Button>
    </NewWriteStyled>
  );
};

export default NewWrite;
