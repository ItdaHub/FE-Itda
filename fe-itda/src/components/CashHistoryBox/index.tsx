import clsx from "clsx";
import { CashHistoryBoxStyled } from "./stylde";

type HistoryItem = {
  title?: string;
  amount: number;
  date: string;
};

const CashHistoryBox = ({
  list,
  type,
}: {
  list: HistoryItem[];
  type: string;
}) => {
  return (
    <CashHistoryBoxStyled className={clsx("history-wrap")}>
      {list.map((item, i) => (
        <div key={i} className="history-row">
          <div className="history-popcorn">{item.amount} 팝콘</div>
          <div
            className={`history-title ${
              type === "charge" ? "history-off" : ""
            }`}
          >
            {item.title}
          </div>
          <div className="history-date">{item.date}</div>
        </div>
      ))}
    </CashHistoryBoxStyled>
  );
};
export default CashHistoryBox;
