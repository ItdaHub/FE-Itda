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
  // const user = useAppSelector((state) => state.auth.user);

  const router = useRouter();

  // 현재 가지고 있는 팝콘 개수
  const popcorns = 20;
  const history = [
    {
      title: "내일의 으뜸",
      amount: 5,
      date: "2025-04-05 09:34:29",
    },
    {
      title: "천상계 탐험기",
      amount: 3,
      date: "2025-04-03 18:12:00",
    },
    {
      title: "천상계 탐험기",
      amount: 2,
      date: "2025-04-03 18:12:00",
    },
    {
      title: "천상계 탐험기",
      amount: 1,
      date: "2025-04-03 18:12:00",
    },
  ];

  // 전체 팝콘 개수 axios get요청
  // useEffect(() => {
  //   const fetchNowCash = async () => {
  //     try {
  //       if (!user?.id) return;
  //       const res = await api.get(`/popcorn/${user.id}`);
  //       console.log(res.data);
  //       setNowCash(res.data.amount);
  //     } catch (e) {
  //       console.error("팝콘 전체 개수 불러오기 실패: ", e);
  //     }
  //   };

  //   fetchNowCash();
  // }, [user.id]);

  // 충전/사용 내역 axios get요청
  useEffect(() => {
    fetchHistory(type);
  }, [type]);
  // useEffect(() => {
  //   if (!user?.id) return;
  //   fetchHistory(type);
  // }, [type, user?.id]);

  const fetchHistory = async (type: "charge" | "use") => {
    try {
      // const res = await api.get(`/${type}/${user.id}`);

      // setHistoryList(res.data);
      setHistoryList(history);
    } catch (err) {
      console.error("내역 가져오기 실패:", err);
    }
  };

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

      {/* 결제할 팝콘 모달창 */}
      <Modal
        title="팝콘 패키지"
        centered
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <CashCharge />
      </Modal>
    </CashHistoryStyled>
  );
};

export default CashHistory;
