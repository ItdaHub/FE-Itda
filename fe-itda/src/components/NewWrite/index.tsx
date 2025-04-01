import clsx from "clsx";
import { NewWriteStyled } from "./styled";
import { Button, Input, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextArea from "antd/es/input/TextArea";

const NewWrite = () => {
  // 불러온 카테고리
  const [categories, setCategories] = useState<object[]>([]);

  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // 작성한 제목
  const [title, setTitle] = useState<string>("");

  // 작성한 내용
  const [content, setContent] = useState<string>("");

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

  // 제목 중복확인 axios
  const checkTitle = async () => {
    if (title.length < 1) {
      message.warning("제목을 1자 이상 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get(`/duple/title?title=${title}`);
      if (response.data.exists) {
        message.error("중복된 제목입니다.");
      } else {
        message.success("사용 가능한 제목입니다.");
      }
    } catch (e) {
      console.log("제목 중복확인 실패: ", e);
    }
  };

  // 선택된 카테고리
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용 입력
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      message.warning("카테고리를 선택해주세요.");
      return;
    }
    if (title.length < 1) {
      message.warning("제목을 1자 이상 입력해주세요.");
      return;
    }
    if (content.length < 10) {
      message.warning("내용을 10자 이상 입력해주세요.");
      return;
    }

    try {
      await axios.post("/new/write", {
        category: selectedCategory,
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
      <h2>새로쓰기</h2>
      <div className="newWrite-box">
        <div className="newWrite-left">
          {/* 카테고리 */}
          <div className="newWrite-category">
            <Select
              defaultValue="장르"
              style={{ width: 120 }}
              onChange={handleCategoryChange}
              options={categories}
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
            <Button onClick={checkTitle}>중복확인</Button>
          </div>

          {/* 내용 */}
          <div className="newWrite-content">
            <TextArea
              showCount
              minLength={10}
              maxLength={300}
              value={content}
              onChange={handleContentChange}
              placeholder="내용을 입력해주세요(10~300자)"
              style={{ height: 120, resize: "none" }}
            />
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
