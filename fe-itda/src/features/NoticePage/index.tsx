import DropdownList from "@/components/Notice";
import { useState } from "react";

const noticeItems = [
  {
    key: "1",
    title: "This is panel header 1",
    content: "안녕하세요",
    priorityLabel: "긴급",
  },
  {
    key: "2",
    title: "This is panel header 2",
    content: "공지사항입니다.",
    priorityLabel: "중요",
  },
  {
    key: "3",
    title: "This is panel header 3",
    content: "주말이 왔어요",
    priorityLabel: "기본",
  },
];

const NoticePage = () => {
  // 공지사항 내용보기 상태
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const handleCollapseChange = (keys: string | string[]) => {
    console.log("현재 열린 패널:", keys);
    setActiveKeys(Array.isArray(keys) ? keys : [keys]); // 한 개의 패널만 선택할 때는 배열로 받지 않고 문자열로 받기 때문에 배열로 만들어주는 것
  };

  return (
    <DropdownList
      title="공지사항"
      items={noticeItems}
      onChange={handleCollapseChange}
    />
  );
};

export default NoticePage;
