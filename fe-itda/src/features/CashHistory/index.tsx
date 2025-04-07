import clsx from "clsx";
import { CashHistoryStyled } from "./styled";
import popcorn from "@/assets/images/popcorn_icon.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import api from "@/utill/api";
import CashHistoryBox from "@/components/CashHistoryBox";

type HistoryItem = {
  title: string;
  amount: number;
  date: string;
};

const CashHistory = () => {
  const [nowCash, setNowCash] = useState(0);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  // const user = useAppSelector((state) => state.auth.user);

  const data = {
    popcorn: 25,
    history: [
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
    ],
  };

  useEffect(() => {
    setNowCash(data.popcorn);
    setHistoryList(data.history);
  }, []);

  // useEffect(() => {
  //   const fetchHistoryData = async () => {
  //     try {
  //       if (!user || !user.id) return;

  //       const res = await api.get(`/popcorn/history/${user.id}`);
  //       const { popcorn, history } = res.data;

  //       setNowCash(popcorn);
  //       setHistoryList(history);
  //     } catch (err) {
  //       console.error("팝콘 내역 가져오기 실패: ", err);
  //     }
  //   };

  //   fetchHistoryData();
  // }, [user.id]);

  return (
    <CashHistoryStyled className={clsx("cash-wrap")}>
      <div className="cash-title">팝콘 내역</div>
      <div className="cash-use-box">
        <div>
          <button className="cash-use">충전내역</button>
          <button className="cash-use">사용내역</button>
        </div>
        <div>
          <button className="cash-popcorn">
            <img className="cash-img" src={popcorn.src} alt="팝콘" />
            팝콘충전
          </button>
        </div>
      </div>

      {/* 현재 가지고 있는 팝콘 개수 */}
      <div className="cash-popcorn-box">
        <div>
          <span className="cash-popcorn-num">{nowCash} </span>팝콘
        </div>
      </div>

      {/* 충전내역 or 사용내역 */}
      <div>
        {historyList.map((item, idx) => (
          <CashHistoryBox
            key={idx}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))}
      </div>
    </CashHistoryStyled>
  );
};

export default CashHistory;
