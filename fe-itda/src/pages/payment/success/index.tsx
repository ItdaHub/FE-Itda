import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const router = useRouter();
  const { orderId, paymentKey, amount } = router.query;
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!orderId || !paymentKey || !amount) return;

    const verifyPayment = async () => {
      try {
        const response = await axios.post("/api/payment/confirm", {
          paymentKey,
          orderId,
          amount,
        });

        setMessage("결제 승인 완료!");
      } catch (error: any) {
        console.error("결제 승인 오류:", error.response?.data || error.message);
        setMessage("결제 승인 실패");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [orderId, paymentKey, amount]);

  return (
    <div>
      <h1>결제 성공</h1>
      {isVerifying ? <p>결제 승인 중...</p> : <p>{message}</p>}
    </div>
  );
};

export default PaymentSuccess;
