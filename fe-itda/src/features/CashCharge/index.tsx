import clsx from "clsx";
import { CashChargeStyled } from "./styled";
import popcornDetail from "@/assets/images/popcorn_detail.png";
// import PaymentCheckoutPage from "../PaymentCheckoutPage";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/utill/api";
// import { PaymentCheckStyled } from "./styled";
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
const customerKey = "mg62XE7cK4Q4Vj58xNINq"; // 실제 프로젝트에선 user.id나 uuid 등 유니크한 값으로 설정

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

  const requestPayments = async ({ price }: { price: number }) => {
    try {
      const amount = price;
      const orderId = `order-${Date.now()}`;
      const orderName = "포인트 충전";
      // const res = await api.get("/pay/tossClientKey");
      // const tossClientKey = res.data.tossClientKey;
      // const toss = await loadTossPayments(tossClientKey); // 토스 sdk

      // 테스트용
      const toss = await loadTossPayments(clientKey); // 토스 sdk

      toss.requestPayment("CARD", {
        amount,
        orderId,
        orderName,
        successUrl: `http://localhost:3000/payment/success?amount=${amount}`,
        failUrl: `http://localhost:3000/payment/fail`,
      });
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      alert("결제를 시작할 수 없습니다.");
    }
  };

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
              <button
                className="pay-button"
                onClick={() => {
                  requestPayments({ price: item.price });
                }}
              >
                {item.price}원
              </button>
            </div>
          </div>
        ))}
      </div>
    </CashChargeStyled>
  );
};

export default CashCharge;
