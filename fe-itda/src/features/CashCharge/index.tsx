import clsx from "clsx";
import { CashChargeStyled } from "./styled";
import popcornDetail from "@/assets/images/popcorn_detail.png";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useAppSelector } from "@/store/hooks";
import api from "@/utill/api";
import { App as AntdApp } from "antd";
import { useRouter } from "next/router";

interface CashChargeProps {
  novelId?: number;
  chapterId?: number;
  type?: string;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

const CashCharge = ({ novelId, chapterId, type }: CashChargeProps) => {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  const popcorn = [
    { num: 10, price: 10 },
    { num: 30, price: 30 },
    { num: 50, price: 50 },
    { num: 100, price: 100 },
  ];

  const requestPayments = async ({ price }: { price: number }) => {
    if (!userId) {
      message.warning("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const amount = price;
      const orderId = `order-${Date.now()}`;
      const orderName = "포인트 충전";

      // 결제 정보 백엔드에 저장
      await api.post("/payments/create", {
        userId,
        novelId,
        chapterId,
        type,
        orderId,
        amount,
        method: "toss",
      });

      // Toss SDK 로딩
      const toss = await loadTossPayments(clientKey);

      // 결제 요청
      toss.requestPayment("CARD", {
        amount,
        orderId,
        orderName,
        successUrl:
          type === "read"
            ? `http://localhost:3000/chapter/${chapterId}?novelId=${novelId}`
            : `http://localhost:3000/payment/success?amount=${amount}&orderId=${orderId}`,
        failUrl: `http://localhost:3000/payment/fail`,
      });
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      message.error("결제를 시작할 수 없습니다.");
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
            </div>
            <button
              className="pay-button"
              onClick={() => requestPayments({ price: item.price })}
            >
              {item.price}원
            </button>
          </div>
        ))}
      </div>
    </CashChargeStyled>
  );
};

export default CashCharge;
