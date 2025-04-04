import DropdownList from "@/components/Notice";
import { useEffect, useState } from "react";

const noticeItems = [
  {
    key: "1",
    title: "This is panel header 1",
    content: "안녕하세요",
    priorityLabel: "기본",
    date: "2025.03.26",
  },
  {
    key: "2",
    title: "This is panel header 2",
    content: "공지사항입니다.",
    priorityLabel: "긴급",
    date: "2025.03.23",
  },
  {
    key: "3",
    title: "This is panel header 3",
    content: "주말이 왔어요",
    priorityLabel: "중요",
    date: "2025.03.22",
  },
  //   {
  //     key: "4",
  //     title: "This is panel header 4",
  //     content: "넘버",
  //   },
];

const priorityOrder: Record<string, number> = {
  긴급: 1,
  중요: 2,
  기본: 3,
};

const NoticePage = () => {
  // 공지사항 내용보기 상태
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // 공지사항 우선순위 정렬 리스트 상태 (긴급 > 중요 > 기본)
  const [sortedItems, setSortedItems] = useState(noticeItems);

  const handleCollapseChange = (keys: string | string[]) => {
    console.log("현재 열린 패널:", keys);
    setActiveKeys(Array.isArray(keys) ? keys : [keys]); // 한 개의 패널만 선택할 때는 배열로 받지 않고 문자열로 받기 때문에 배열로 만들어주는 것
  };

  useEffect(() => {
    const sorted = [...noticeItems].sort(
      (a, b) => priorityOrder[a.priorityLabel] - priorityOrder[b.priorityLabel]
    );
    setSortedItems(sorted);
  }, []); // ✅ 최초 1번 정렬

  //   useEffect(() => {
  //     const sorted = [...noticeItems]
  //       .map((item) => ({
  //         ...item,
  //         priorityLabel: item.priorityLabel ?? "기본", // 없는 경우 기본 처리
  //         isNumbered: !item.priorityLabel, // 넘버링이 필요한 항목 체크
  //       }))
  //       .sort(
  //         (a, b) =>
  //           priorityOrder[a.priorityLabel ?? "기본"] -
  //           priorityOrder[b.priorityLabel ?? "기본"]
  //       )
  //       .map((item, index) => {
  //         if (item.isNumbered) {
  //           return {
  //             ...item,
  //             title: `[${index + 1}] ${item.title}`,
  //           };
  //         }
  //         return item;
  //       });

  //     setSortedItems(sorted);
  //   }, []);

  return (
    <DropdownList
      title="공지사항"
      //   items={noticeItems}
      items={sortedItems}
      onChange={handleCollapseChange}
    />
  );
};

export default NoticePage;
