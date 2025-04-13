import clsx from "clsx";
import { NewWriteStyled } from "./styled";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "antd/es/input/TextArea";
import { InfoCircleFilled } from "@ant-design/icons";
import api from "@/utill/api";
import { App as AntdApp } from "antd";

const people = [
  { label: "5명", value: 5 },
  { label: "7명", value: 7 },
  { label: "9명", value: 9 },
];

const NewWrite = ({
  type,
  titles,
  genres,
  novelId,
}: {
  type: "new" | "relay";
  titles?: string;
  genres?: string;
  novelId?: number;
}) => {
  const { message } = AntdApp.useApp();
  const [categories, setCategories] = useState<object[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [aiquestion, setAIquestion] = useState<string>("");
  const [aianswer, setAIanswer] = useState<string>("");

  const router = useRouter();

  // 카테고리 불러오기
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

  // 이어쓰기용 원본 소설 정보 불러오기
  useEffect(() => {
    const fetchOriginalNovel = async () => {
      if (type === "relay" && novelId) {
        try {
          const res = await api.get(`/novels/${novelId}`);
          const original = res.data;

          setContent("");
          setTitle(original.title);
          setSelectedCategory(original.categoryId);

          // 🔥 현재 몇 화인지 계산해서 보여주고 싶다면
          const nextChapterNumber = original.chapters.length + 1;
          console.log("👉 다음 화는", nextChapterNumber, "화입니다");
          // 필요하다면 상태로 저장해서 UI에 보여줄 수 있음
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

  const handleAIanswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAIanswer(e.target.value);
  };

  const useAIanswer = () => {
    // 사용자가 '사용하기' 버튼을 클릭한 후에만 내용에 반영
    if (aianswer.trim()) {
      setContent(aianswer); // AI 답변을 수동으로 적용
    }
  };

  const handleAskAI = async () => {
    if (!aiquestion.trim()) {
      message.warning("AI에게 보낼 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await api.post("/ai/generate", {
        prompt: aiquestion,
      });

      console.log("✅ AI 응답:", response.data);
      // AI 응답 받기
      setAIanswer(response.data.content || "AI의 응답이 없습니다.");
    } catch (error) {
      console.error("AI 요청 실패:", error);
      message.error("AI 응답을 받는 데 실패했습니다.");
    }
  };

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

    // if (!aianswer.trim()) {
    //   message.warning("AI 답변을 사용해 주세요.");
    //   return;
    // }

    console.log("제출 데이터:", {
      type,
      categoryId: selectedCategory,
      peopleNum: selectedPeople,
      title,
      content,
    });

    try {
      if (type === "new") {
        await api.post("/novels", {
          categoryId: selectedCategory,
          peopleNum: selectedPeople,
          title,
          content,
          type: "new",
        });
      } else if (type === "relay" && novelId) {
        await api.post(`/chapters/write/${novelId}`, {
          content,
        });
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

  return (
    <NewWriteStyled className={clsx("newWrite-wrap")}>
      {type === "new" ? <h2>새로쓰기</h2> : <h2>이어쓰기</h2>}

      <div className="newWrite-box">
        <div className={type === "new" ? "newWrite-left" : "newWrite-AI-Off"}>
          <div className="newWrite-content">
            나
            <TextArea
              showCount
              minLength={10}
              maxLength={300}
              value={aiquestion}
              onChange={handleAIquestionChange}
              placeholder="AI에게 첫내용을 추천받아보세요(10~300자)"
              style={{ height: 60, resize: "none" }}
            />
            <Button onClick={handleAskAI}>물어보기</Button>
          </div>
          <div className="newWrite-content">
            AI
            <TextArea
              showCount
              maxLength={300}
              value={aianswer}
              readOnly
              placeholder="AI답변이 입력됩니다"
              style={{ height: 120, resize: "none" }}
            />
            <Button onClick={useAIanswer}>사용하기</Button>
          </div>
        </div>

        <div
          className={`newWrite-right ${
            type === "new" ? "" : "newWrite-rightborder"
          }`}
        >
          <div className="newWrite-category-box">
            {type === "new" ? (
              <>
                <div className="newWrite-category">
                  <Select
                    value={selectedCategory}
                    style={{ width: 120 }}
                    onChange={handleCategoryChange}
                    options={categories}
                    placeholder="장르"
                  />
                </div>

                <div className="newWrite-category">
                  <Select
                    value={selectedPeople || undefined}
                    style={{ width: 120 }}
                    onChange={handlePeopleChange}
                    options={people}
                    placeholder="인원수"
                  />
                </div>

                <div className="newWrite-title">
                  <Input
                    maxLength={10}
                    placeholder="제목은 10자 이내로 작성해주세요"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="newWrite-relay-genre">{genres}</div>
                <div className="newWrite-relay-title">{titles}</div>
              </>
            )}

            <div className="newWrite-content">
              <TextArea
                showCount
                minLength={10}
                maxLength={300}
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력해주세요(10~300자)"
                defaultValue={content}
                style={{ height: 120, resize: "none" }}
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
        </div>
      </div>

      <Button className="newWrite-btn" onClick={handleSubmit}>
        등록
      </Button>
    </NewWriteStyled>
  );
};

export default NewWrite;
