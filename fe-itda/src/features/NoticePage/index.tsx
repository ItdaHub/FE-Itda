import DropdownList from "@/components/Notice";
import { useEffect, useRef, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";

interface ApiResponseNotice {
  id: number;
  title: string;
  content: string;
  priority: "urgent" | "normal";
  created_at: string;
}

interface DropdownItem {
  key: string;
  title: string;
  content: string;
  priority?: "urgent" | "normal";
  date: string;
}

const priority: Record<"urgent" | "normal", number> = {
  // 백엔드 enum 값과 타입 일치
  urgent: 1,
  normal: 2,
};

const NoticePage = () => {
  // 유저 정보
  const user = useAppSelector((state) => state.auth.user);

  // 공지사항 내용보기 상태
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // DropdownList에 전달할 아이템 목록 상태
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 중복 요청 방지
  const readIdsRef = useRef<Set<string>>(new Set());

  const handleCollapseChange = async (keys: string | string[]) => {
    const openedKeys = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(openedKeys);

    try {
      // 읽은 공지사항 처리 API 호출
      for (const key of openedKeys) {
        if (!readIdsRef.current.has(key)) {
          console.log(user?.id, key);
          await api.post(`/announcement/read/${key}`);
          readIdsRef.current.add(key);
        }
      }
    } catch (err) {
      console.error("읽음 처리 실패:", err);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const res = await api.get<ApiResponseNotice[]>("/announcement");
        const transformedData = res.data.map((item) => ({
          key: String(item.id),
          title: item.title,
          content: item.content,
          priority: item.priority,
          date: item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : "Invalid Date",
        }));
        setDropdownItems(transformedData);
      } catch (error: any) {
        console.error("공지사항 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 우선순위에 따라 정렬된 공지사항 목록 (렌더링 시 계산)
  const sortedItems = [...dropdownItems].sort((a, b) => {
    const priorityA = priority[a.priority ?? "normal"];
    const priorityB = priority[b.priority ?? "normal"];
    return priorityA - priorityB;
  });

  if (loading) {
    return <div>공지사항 목록을 불러오는 중...</div>;
  }

  return (
    <DropdownList
      title="공지사항"
      items={sortedItems}
      onChange={handleCollapseChange}
      emptyMessage="공지사항이 없습니다."
    />
  );
};

export default NoticePage;
