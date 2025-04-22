import DropdownList from "@/components/Notice";
import { useEffect, useRef, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";

const AlertPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [alertItems, setAlertItems] = useState<
    { key: string; title: string; content: string; date: string }[]
  >([]);

  // 읽음 처리 중복 방지
  const readIdsRef = useRef<Set<string>>(new Set());

  const handleCollapseChange = async (keys: string | string[]) => {
    const selectedKeys = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(selectedKeys);

    // 읽음 처리 API요청
    for (const key of selectedKeys) {
      if (!readIdsRef.current.has(key)) {
        try {
          await api.patch(`/notifications/${key}/read`, {
            userId: user?.id,
          });
          readIdsRef.current.add(key);
        } catch (e) {
          console.log(`알림 ${key} 읽음 처리 실패: `, e);
        }
      }
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/notifications", {
          withCredentials: true, // 로그인 쿠키 필요
        });

        const items = res.data.map((item: any) => ({
          key: item.id.toString(),
          title: item.type === "REPORT" ? "신고 알림" : "소설 제출 알림",
          content: item.content,
          date: new Date(item.created_at).toLocaleDateString("ko-KR"),
        }));

        setAlertItems(items);
      } catch (error) {
        console.error(" 알림 목록 불러오기 실패:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <DropdownList
      title="알림"
      items={alertItems}
      onChange={handleCollapseChange}
      emptyMessage="받은 알림이 없습니다."
    />
  );
};

export default AlertPage;
