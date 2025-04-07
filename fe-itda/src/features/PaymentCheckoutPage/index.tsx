import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import axios from "axios";
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
const customerKey = "mg62XE7cK4Q4Vj58xNINq"; // 실제 프로젝트에선 user.id나 uuid 등 유니크한 값으로 설정
const PaymentCheckoutPage = () => {
  const [payment, setPayment] = useState<any>(null);
  const [amount] = useState({
    currency: "KRW",
    value: 1000, // 실제 결제 금액
  });
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
      } catch (error) {
        console.error("Error loading Toss Payments SDK:", error);
      }
    };
    fetchPayment();
  }, []);
  const requestPayment = async () => {
    const orderId = `order-${Date.now()}`;
    // 1. 서버에 결제 정보 저장
    try {
      await axios.post("/payments", {
        userId: customerKey,
        orderId: orderId,
        amount: amount.value,
      });
    } catch (err) {
      console.error("결제 정보 사전 저장 실패:", err);
      alert("결제 요청에 실패했습니다.");
      return;
    }
    // 2. Toss 결제창 요청
    try {
      await payment.requestPayment({
        method: "CARD",
        amount: amount.value,
        orderId,
        orderName: "토스 웹소설",
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (err) {
      console.error("결제 실패:", err);
    }
  };
  return (
    <button className="button" onClick={requestPayment}>
      결제하기
    </button>
  );
};
export default PaymentCheckoutPage;
