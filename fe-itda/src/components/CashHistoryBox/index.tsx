import clsx from "clsx";
import { CashHistoryBoxStyled } from "./stylde";

type Props = {
  title: string;
  amount: number;
  date: string;
};

const CashHistoryBox = ({ title, amount, date }: Props) => {
  return (
    <CashHistoryBoxStyled className={clsx("history-wrap")}>
      <div className="history-popcorn">{amount} 팝콘</div>
      <div className="history-title">{title}</div>
      <div className="history-date">{date}</div>
    </CashHistoryBoxStyled>
  );
};
export default CashHistoryBox;
