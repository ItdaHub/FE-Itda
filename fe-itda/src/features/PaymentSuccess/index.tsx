import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";

const PaymentSuccess = () => {
  const router = useRouter();
  const rawAmount = router.query.amount;
  const amount = Array.isArray(rawAmount) ? rawAmount[0] : rawAmount;
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!amount) return;

    // axios요청 - 유저 아이디, 가격
    const verifyPayment = async () => {
      try {
        const response = await api.post("/payment/confirm", {
          userId,
          amount,
        });

        console.log(response.data);

        setMessage("결제 승인 완료!");
      } catch (error: any) {
        console.error("결제 승인 오류:", error.response?.data || error.message);
        setMessage("결제 승인 실패");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [userId, amount]);

  return (
    <div>
      <h1>결제 성공</h1>
      {isVerifying ? <p>결제 승인 중...</p> : <p>{message}</p>}
    </div>
  );
};

export default PaymentSuccess;
