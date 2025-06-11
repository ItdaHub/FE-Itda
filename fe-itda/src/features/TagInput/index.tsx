import { Input, Tag, message } from "antd";
import { useState } from "react";
import { TagInputStyled } from "./styled";
import clsx from "clsx";
import { InfoCircleFilled } from "@ant-design/icons";

const MAX_TAG_LENGTH = 5;
const MAX_TAG_COUNT = 5;

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("#");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // # 없으면 붙이고 중복 제거
    if (!val.startsWith("#")) {
      val = "#" + val.replace(/^#+/, "");
    }

    if (val.slice(1).length <= MAX_TAG_LENGTH) {
      setInputValue(val);
    } else {
      message.warning("태그는 5자 이내로 입력해주세요.");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();

      if (trimmed.length <= 1) return;

      if (value.length >= MAX_TAG_COUNT) {
        message.warning("최대 5개의 태그만 추가할 수 있습니다.");
        return;
      }

      if (value.includes(trimmed)) {
        message.warning("이미 추가된 태그입니다.");
        return;
      }

      onChange([...value, trimmed]);
      setInputValue("#");
    }
  };

  // 작성된 태그 제거
  const handleTagClose = (removedTag: string) => {
    onChange(value.filter((tag) => tag !== removedTag));
  };

  return (
    <TagInputStyled className={clsx("taginput-wrap")}>
      <div className="taginput-box">
        {value.map((tag) => (
          <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
      <Input
        className="taginput-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="taginput-info-box">
        <div className="taginput-info">
          <div className="taginput-info-icon">
            <InfoCircleFilled className="taginput-icon" />
          </div>
          <div>
            <div className="taginput-info-one">
              태그를 입력해보세요 (최대 5자, 최대 5개)
            </div>
            <div className="taginput-info-two">
              해당 태그는 작품 밑에 표시될 예정입니다.
            </div>
          </div>
        </div>
      </div>
    </TagInputStyled>
  );
};

export default TagInput;
