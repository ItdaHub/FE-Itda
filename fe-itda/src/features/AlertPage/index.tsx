import { useEffect, useRef, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { AlertPageStyled } from "./styled";
import clsx from "clsx";

type AlertType = "ALL" | "REPORT" | "NOVEL_SUBMIT";

interface AlertItem {
  key: string;
  type: AlertType;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  NovelId?: number; // 이동할 소설 ID
}

const AlertPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [alertItems, setAlertItems] = useState<AlertItem[]>([]);
  const [selectedType, setSelectedType] = useState<AlertType>("ALL");
  const router = useRouter();

  // 읽음 처리 중복 방지
  const readIdsRef = useRef<Set<string>>(new Set());

  // 읽음 처리 API 요청
  const markAsRead = async (key: string) => {
    if (!readIdsRef.current.has(key)) {
      try {
        await api.patch(`/notifications/${key}/read`, {
          userId: user?.id,
        });
        readIdsRef.current.add(key);

        setAlertItems((prev) =>
          prev.map((item) =>
            item.key === key ? { ...item, isRead: true } : item
          )
        );
      } catch (e) {
        console.error(`알림 ${key} 읽음 처리 실패`, e);
      }
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/notifications", {
          withCredentials: true,
        });

        console.log(res.data, "알리리리리ㅣㅁfdgjnk");

        const items = res.data.map((item: any) => {
          let alertType: AlertType =
            item.type === "REPORT" ? "REPORT" : "NOVEL_SUBMIT";

          return {
            key: item.id.toString(),
            type: alertType,
            title: alertType === "REPORT" ? "신고" : "소설",
            content: item.content,
            date: new Date(item.created_at).toLocaleDateString("ko-KR"),
            isRead: item.is_read,
            NovelId: item.novel?.id, // 소설 ID
          };
        });

        setAlertItems(items);
      } catch (error) {
        console.error("알림 목록 불러오기 실패:", error);
      }
    };

    fetchAlerts();
  }, []);

  const filteredItems =
    selectedType === "ALL"
      ? alertItems
      : alertItems.filter((item) => item.type === selectedType);

  return (
    <AlertPageStyled className={clsx("alert-wrap")}>
      <div className="alert-nav">
        <button
          className={`alert-tab ${selectedType === "ALL" ? "active" : ""}`}
          onClick={() => setSelectedType("ALL")}
        >
          전체
        </button>
        <button
          className={`alert-tab ${selectedType === "REPORT" ? "active" : ""}`}
          onClick={() => setSelectedType("REPORT")}
        >
          신고
        </button>
        <button
          className={`alert-tab ${
            selectedType === "NOVEL_SUBMIT" ? "active" : ""
          }`}
          onClick={() => setSelectedType("NOVEL_SUBMIT")}
        >
          소설
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="alert-none">받은 알림이 없습니다.</div>
      ) : (
        <ul className="alert-box">
          {filteredItems.map((item) => (
            <li
              key={item.key}
              className={`alert-item ${
                item.isRead ? "alert-white" : "alert-gray"
              }`}
              onClick={async () => {
                if (
                  item.type === "NOVEL_SUBMIT" &&
                  item.NovelId !== undefined
                ) {
                  // 읽음처리 후 해당 출품 소설로 이동
                  await markAsRead(item.key);
                  router.push(`/noveldetail/novelcheck/${item.NovelId}`);
                } else {
                  // 읽음 처리만
                  markAsRead(item.key);
                }
              }}
            >
              <div className="alert-bold">{item.title}</div>
              <div className="alert-content-box">
                <div className="alert-content">{item.content}</div>
                <div className="alert-date">{item.date}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AlertPageStyled>
  );
};

export default AlertPage;
