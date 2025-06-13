import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import { PaymentSuccessStyled } from "./styled";
import clsx from "clsx";
import { Button, Result, Spin } from "antd";

// 결제 성공
const PaymentSuccess = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");
  const [amountDisplay, setAmountDisplay] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    let { paymentKey, orderId, amount } = router.query;

    // 배열이면 첫 번째 값만 사용
    if (Array.isArray(orderId)) {
      orderId = orderId[0];
    }
    if (Array.isArray(amount)) {
      amount = amount[0];
    }

    if (!paymentKey || !orderId || !amount) {
      console.warn("필수 결제 정보 누락:", { paymentKey, orderId, amount });
      setMessage("결제 승인에 필요한 정보가 누락되었습니다.");
      setIsVerifying(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const numericAmount = Number(amount);

        const response = await api.post("/payments/confirm", {
          paymentKey,
          orderId,
          amount: numericAmount,
        });
        setAmountDisplay(numericAmount.toLocaleString());
        setMessage("결제가 정상적으로 처리되었어요.");
      } catch (error: any) {
        console.error(
          "[결제 승인 오류]",
          error.response?.data || error.message
        );
        setMessage("결제 승인 중 문제가 발생했어요.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [router.isReady, router.query]);

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
                ? `총 ${amountDisplay}원이 결제되었습니다.`
                : "결제는 되었지만 승인 처리 중 오류가 있었어요."
            }
            extra={[
              <Button
                key="home"
                type="primary"
                onClick={() => router.push("/")}
              >
                홈으로 이동
              </Button>,
              <Button
                key="chargeHistory"
                onClick={() => router.push("/cashhistory")}
              >
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
