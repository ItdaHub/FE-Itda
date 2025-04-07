import clsx from "clsx";
import { CashChargeStyled } from "./styled";
import popcornDetail from "@/assets/images/popcorn_detail.png";
import PaymentCheckoutPage from "../PaymentCheckoutPage";

const CashCharge = () => {
  const popcorn = [
    {
      num: 1,
      price: 1,
    },
    {
      num: 10,
      price: 10,
    },
    {
      num: 30,
      price: 30,
    },
    {
      num: 50,
      price: 50,
    },
    {
      num: 100,
      price: 100,
    },
  ];

  return (
    <CashChargeStyled className={clsx("charge-wrap")}>
      <div className="charge-wrap-box">
        {popcorn.map((item, i) => (
          <div key={i} className="charge-box">
            <div className="charge-popcorn-box">
              <img
                className="charge-popcorn"
                src={popcornDetail.src}
                alt="팝콘"
              />
              {item.num}개
            </div>
            <PaymentCheckoutPage price={item.price} />
          </div>
        ))}
      </div>
    </CashChargeStyled>
  );
};

export default CashCharge;
