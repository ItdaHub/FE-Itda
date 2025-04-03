import clsx from "clsx";
import { NewWriteStyled } from "./styled";
import { Button, Input, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "antd/es/input/TextArea";
import { InfoCircleFilled } from "@ant-design/icons";

const people = [
  { label: "5명", value: "five" },
  { label: "7명", value: "seven" },
  { label: "9명", value: "nine" },
];

const NewWrite = ({
  type,
  titles,
  genres,
}: {
  type: any;
  titles?: any;
  genres?: any;
}) => {
  // 불러온 카테고리
  const [categories, setCategories] = useState<object[]>([]);

  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedpeople, setSelectedPeople] = useState<string>("");

  // 작성한 제목
  const [title, setTitle] = useState<string>("");

  // 작성한 내용
  const [content, setContent] = useState<string>("");
  const [aiquestion, setAIquestion] = useState<string>("");
  const [aianswer, setAIanswer] = useState<string>("");

  const router = useRouter();

  // 장르 카테고리 불러오기 axios
  const getGenre = async () => {
    try {
      // const response = await axios.get("/api/categories");
      // setCategories(response.data);
      setCategories([
        { label: "로맨스", value: "romance" },
        { label: "로판", value: "ropan" },
        { label: "판타지", value: "fantasy" },
        { label: "현판", value: "hyenpan" },
        { label: "무협", value: "muhyeop" },
      ]);
    } catch (e) {
      console.error("카테고리 불러오기 실패: ", e);
    }
  };

  useEffect(() => {
    getGenre();
  }, []);

  // 선택된 카테고리
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePeopleChange = (value: string) => {
    setSelectedPeople(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용 입력
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 내가 물어본 내용
  const handleAIquestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAIquestion(e.target.value);
  };

  // ai의 답변
  const handleAIanswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAIanswer(e.target.value);
  };

  // ai답변 사용하기
  const useAIanswer = () => {
    setContent(aianswer);
  };

  const handleSubmit = async () => {
    if (type === "new" && !selectedCategory) {
      message.warning("카테고리를 선택해주세요.");
      return;
    }

    if (type === "new" && !selectedpeople) {
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

    try {
      // 새로쓰기랑 이어쓰기 같은 axios보내도 되나??(이어쓰기는 카테고리랑 title이 빈값)
      await axios.post("/new/write", {
        category: selectedCategory,
        peopleNum: selectedpeople,
        title,
        content,
      });
      message.success("등록되었습니다.", 1, () => {
        router.push("/main");
      });
    } catch (e) {
      console.error("등록 실패: ", e);
      message.error("등록에 실패했습니다.");
    }
  };

  return (
    <NewWriteStyled className={clsx("newWrite-wrap")}>
      {type === "new" ? (
        <>
          <h2>새로쓰기</h2>
        </>
      ) : (
        <h2>이어쓰기</h2>
      )}

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
              placeholder="AI에게 첫내용을 추천해받아보세요(10~300자)"
              style={{ height: 60, resize: "none" }}
            />
            <Button>물어보기</Button>
          </div>
          <div className="newWrite-content">
            AI
            <TextArea
              showCount
              minLength={10}
              maxLength={300}
              value={aianswer}
              onChange={handleAIanswerChange}
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
                {/* 카테고리 */}
                <div className="newWrite-category">
                  <Select
                    defaultValue="장르"
                    style={{ width: 120 }}
                    onChange={handleCategoryChange}
                    options={categories}
                  />
                </div>

                {/* 명수 제한 카테고리 */}
                <div className="newWrite-category">
                  <Select
                    defaultValue="인원수"
                    style={{ width: 120 }}
                    onChange={handlePeopleChange}
                    options={people}
                  />
                </div>

                {/* 제목 */}
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

            {/* 내용 */}
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

      {/* 등록버튼 */}
      <Button className="newWrite-btn" onClick={handleSubmit}>
        등록
      </Button>
    </NewWriteStyled>
  );
};

export default NewWrite;
