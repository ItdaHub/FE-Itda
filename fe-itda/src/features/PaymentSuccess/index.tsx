import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import { PaymentSuccessStyled } from "./styled";
import clsx from "clsx";
import { Button, Result, Spin } from "antd";

const PaymentSuccess = () => {
  const router = useRouter();
  const rawAmount = router.query.amount;
  const amount = Array.isArray(rawAmount) ? rawAmount[0] : rawAmount;
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(amount);
    if (!amount) return;

    // axios요청 - 유저 아이디, 가격
    const verifyPayment = async () => {
      try {
        const response = await api.post("/payment/confirm", {
          userId,
          amount,
        });

        console.log(response.data);

        setMessage("결제가 정상적으로 처리되었어요.");
      } catch (error: any) {
        console.error("결제 승인 오류:", error.response?.data || error.message);
        setMessage("결제 승인 중 문제가 발생했어요.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [userId, amount]);

  return (
    <PaymentSuccessStyled className={clsx("success-wrap")}>
      <div className="success-box">
        {isVerifying ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px 0",
            }}
          >
            <Spin tip="결제 승인 중..." size="large" />
          </div>
        ) : (
          <Result
            status={message.includes("정상") ? "success" : "error"}
            title={
              message.includes("정상")
                ? "결제가 완료되었어요!"
                : "결제 승인 실패"
            }
            subTitle={
              message.includes("정상")
                ? `총 ${amount}원이 결제되었습니다.`
                : "결제는 되었지만 승인 처리 중 오류가 있었어요."
            }
            extra={[
              <Button type="primary" onClick={() => router.push("/")}>
                홈으로 이동
              </Button>,
              <Button onClick={() => router.push("/cashhistory")}>
                충전 내역 보기
              </Button>,
            ]}
          />
        )}
      </div>
    </PaymentSuccessStyled>
  );
};

export default PaymentSuccess;
