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
  isRead: boolean;
}

interface DropdownItem {
  key: string;
  title: string;
  content: string;
  priority?: "urgent" | "normal";
  date: string;
  isRead: boolean;
}

const priority: Record<"urgent" | "normal", number> = {
  urgent: 1,
  normal: 2,
};

const NoticePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const readIdsRef = useRef<Set<string>>(new Set());

  // 읽음 처리
  const handleCollapseChange = async (keys: string | string[]) => {
    const openedKeys = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(openedKeys);

    if (!user?.id) return; // 로그인하지 않으면 읽음 처리하지 않음

    try {
      for (const key of openedKeys) {
        if (!readIdsRef.current.has(key)) {
          await api.post(`/announcement/read/${key}`, { userId: user.id });
          readIdsRef.current.add(key);

          // 읽음 처리 UI에도 반영
          setDropdownItems((prev) =>
            prev.map((item) =>
              item.key === key ? { ...item, isRead: true } : item
            )
          );
          console.log(`읽음 처리됨: ${key}`);
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
        const res = await api.get<ApiResponseNotice[]>(
          `/announcement?userId=${user?.id}`
        );
        const transformedData = res.data.map((item) => {
          const idStr = String(item.id);
          if (item.isRead) {
            readIdsRef.current.add(idStr); // 중복 방지
          }
          return {
            key: idStr,
            title: item.title,
            content: item.content,
            priority: item.priority,
            date: item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "Invalid Date",
            isRead: item.isRead,
          };
        });
        setDropdownItems(transformedData);
      } catch (error: any) {
        console.error("공지사항 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 우선순위 정렬
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
