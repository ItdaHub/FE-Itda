import clsx from "clsx";
import { ReadBookStyled } from "./styled";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type ReadBookProps = {
  chapterId: number;
};

const ReadBook = ({ chapterId }: { chapterId: number }) => {
  const contentList = [
    "어느 날 갑자기, 세계가 멸망했다...",
    "주인공은 눈을 떴다. 낯선 곳이었다.",
    "여... 여긴 어디지..?",
    "그는 결심했다. 반드시 살아남겠다고.",
    "그날, 나는 그를 처음 만났다. 낯선 분위기의 그 사람은 모든 것이 미스터리로 가득했다.",
    "하지만 이상하게도, 나는 그에게 이끌렸다. 설명할 수 없는 끌림이었다.",
    "“당신은 누구죠?” 내가 물었다. 그는 한참을 침묵하다 대답했다.",
    "“곧 알게 될 거예요. 모든 게.” 그의 말은 묘한 울림이 있었다.",
    "그날 이후, 내 일상은 조금씩 변해가기 시작했다.",
    "매일 같은 풍경 속에서 낯선 무언가가 보이기 시작했다.",
    "마치, 누군가가 지켜보고 있는 것처럼 느껴졌다.",
    "그리고, 나는 그를 다시 마주쳤다. 이번에는... 달랐다.",
    `그날, 나는 그를 처음 만났다. 낯선 분위기의 그 사람은 모든 것이 미스터리로 가득했다. 하지만 이상하게도, 나는 그에게 이끌렸다. 설명할 수 없는 끌림이었다. “당신은 누구죠?” 내가 물었다. 그는 한참을 침묵하다 대답했다. “곧 알게 될 거예요. 모든 게.” 그의 말은 묘한 울림이 있었다. 그날 이후, 내 일상은 조금씩 변해가기 시작했다. 매일 같은 풍경 속에서 낯선 무언가가 보이기 시작했다. 마치, 누군가가 지켜보고 있는 것처럼 느껴졌다. 그리고, 나는 그를 다시 마주쳤다. 이번에는... 달랐다.`,
    `하루하루가 낯설게 흘러갔다. 나는 변해가는 세상을 바라보며 내가 선택한 길에 대해 생각했다. 하지만 돌아갈 수는 없었다. 이미 너무 멀리 와버렸기 때문이다. 그와 함께한 시간들은 진실과 거짓 사이에서 갈팡질팡하게 만들었다. 어느 날, 그는 내게 말했다. “모든 게 끝나면, 우린 자유로워질 수 있을까요?” 나도 몰랐다. 하지만 희망만은 잃지 않기로 했다.`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const charsPerPage = 600;

  const currentText = contentList[currentIndex] || "";
  const leftText = currentText.slice(0, charsPerPage);
  const rightText = currentText.slice(charsPerPage);

  const goToNext = () => {
    if (currentIndex + 1 < contentList.length)
      setCurrentIndex(currentIndex + 1);
  };

  const goToPrev = () => {
    if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      <div className="readbook-book">
        <div className="readbook-page left">{leftText}</div>
        <div className="readbook-page right">{rightText}</div>
      </div>
      <div className="readbook-controls">
        <button onClick={goToPrev}>
          <LeftOutlined />
        </button>
        <button onClick={goToNext}>
          <RightOutlined />
        </button>
      </div>
    </ReadBookStyled>
  );
};

export default ReadBook;
