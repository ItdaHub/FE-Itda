import clsx from "clsx";
import { CashHistoryStyled } from "./styled";
import popcorn from "@/assets/images/popcorn_icon.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import api from "@/utill/api";
import CashHistoryBox from "@/components/CashHistoryBox";
import { useRouter } from "next/router";
import CashCharge from "../CashCharge";
import { Modal } from "antd";
import PopcornModal from "@/components/PopcornModal";

type HistoryItem = {
  title?: string;
  amount: number;
  date: string;
};

const CashHistory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nowCash, setNowCash] = useState(0);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [type, setType] = useState<"charge" | "use">("charge");
  const user = useAppSelector((state) => state.auth.user);

  const userId = user ? user.id : null;

  // 전체 팝콘 개수 axios get요청
  useEffect(() => {
    const getCharge = async () => {
      try {
        const res = await api.get(`/popcorn/${userId}`);
        console.log("포인트 응답:", res.data);
        setNowCash(res.data.total);
      } catch (error) {
        console.error("팝콘개수 불러오기 실패:", error);
      }
    };

    if (userId) {
      getCharge();
    }
  }, [userId]);

  // 충전/사용 내역 axios get요청
  useEffect(() => {
    if (!userId) return;
    fetchHistory(type);
  }, [type, userId]);

  const fetchHistory = async (type: "charge" | "use") => {
    try {
      const res = await api.get(`/popcorn/${type}/${userId}`);
      setHistoryList(res.data);
    } catch (err) {
      console.error(`${type} 내역 가져오기 실패:`, err);
    }
  };

  if (!user) return null;

  return (
    <CashHistoryStyled className={clsx("cash-wrap")}>
      <div className="cash-title">팝콘 내역</div>
      <div className="cash-use-box">
        <div>
          <button
            className={`cash-use ${type === "charge" ? "active" : ""}`}
            onClick={() => setType("charge")}
          >
            충전내역
          </button>
          <button
            className={`cash-use ${type === "use" ? "active" : ""}`}
            onClick={() => setType("use")}
          >
            사용내역
          </button>
        </div>
        <div>
          <button onClick={() => setModalOpen(true)} className="cash-popcorn">
            <img className="cash-img" src={popcorn.src} alt="팝콘" />
            팝콘충전
          </button>
        </div>
      </div>

      {/* 현재 가지고 있는 팝콘 개수 */}
      <div className="cash-popcorn-box">
        <div>
          <span className="cash-popcorn-num">{nowCash} </span>
          <span className="cash-popcorn-unit">팝콘</span>
        </div>
      </div>

      {/* 충전내역 or 사용내역 */}
      <div>
        <CashHistoryBox list={historyList} type={type} />
      </div>

      {/* 팝콘 모달창 */}
      <PopcornModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </CashHistoryStyled>
  );
};

export default CashHistory;
