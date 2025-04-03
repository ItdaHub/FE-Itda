import { useRouter } from "next/router";

const PaymentFail = () => {
  const router = useRouter();
  const { code, message, orderId } = router.query;

  return (
    <div>
      <h1>결제 실패</h1>
      <p>에러 코드: {code}</p>
      <p>에러 메시지: {message}</p>
      {orderId && <p>주문 ID: {orderId}</p>}
    </div>
  );
};

export default PaymentFail;
