import { BuyChapterModalStyled } from "./styled";
import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button } from "antd";
import api from "@/utill/api";
import { App as AntdApp } from "antd";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

interface Props {
  novelId: number;
  chapterId: number;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  chapter: any;
  novelTitle?: string;
}

const BuyChapterModal = ({
  novelId,
  chapterId,
  modalOpen,
  setModalOpen,
  chapter,
  novelTitle,
}: Props) => {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const [nowCash, setNowCash] = useState<any>();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const amount = 10;

  // 현재 팝콘 개수 axios get요청
  const getCharge = async () => {
    try {
      const res = await api.get(`/popcorn/${userId}`);
      setNowCash(res.data.total);
    } catch (error) {
      console.error("팝콘개수 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getCharge();
    }
  }, [userId]);

  // 팝콘 10개가 안된다면 결제 요청
  const handleBuy = async () => {
    if (!userId) {
      message.warning("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    console.log("🔔 구매 처리 시작");

    try {
      const orderId = `order-${Date.now()}`;
      const orderName = "포인트 충전";

      console.log("📦 백엔드로 결제 생성 요청:", {
        userId,
        novelId,
        chapterId,
        type: "read",
        orderId,
        amount,
        method: "toss",
      });

      // 1. 결제 정보 백엔드에 저장
      const res = await api.post("/payments/create", {
        userId,
        novelId,
        chapterId,
        type: "read",
        orderId,
        amount,
        method: "toss",
      });

      console.log("✅ 결제 정보 저장 완료:", res.data);

      // 2. Toss SDK 로딩
      const toss = await loadTossPayments(clientKey);
      console.log("🚀 Toss SDK 로딩 완료");

      // 3. 결제 요청
      await toss.requestPayment("CARD", {
        amount,
        orderId,
        orderName,
        successUrl: `http://localhost:3000/chapter/${chapterId}?novelId=${novelId}`,
        failUrl: `http://localhost:3000/payment/fail`,
      });

      setModalOpen(false);
    } catch (e: any) {
      console.error("❌ 팝콘 구매 요청 실패:", e);
      console.error("🧾 에러 응답:", e?.response?.data || e.message);
    }
  };

  // 팝콘 사용 요청 함수
  const handleUse = async () => {
    console.log("사용 처리 로직");

    try {
      await api.post("/popcorn/use", {
        userId,
        amount, // 사용해야 하는 팝콘 개수
        novelId,
        chapterId,
      });
      setModalOpen(false);
      router.push(`/chapter/${chapterId}?novelId=${novelId}`);
    } catch (e) {
      console.error("팝콘 사용 요청 실패: ", e);
    }
  };

  return (
    <BuyChapterModalStyled>
      <AntModal
        title="회차 결제"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
      >
        <p>
          {novelTitle} <strong>{chapter}화</strong>
        </p>
        <p>
          <strong>보유 팝콘:</strong> {nowCash}팝콘
        </p>
        <Button
          type="primary"
          onClick={nowCash < 10 ? handleBuy : handleUse}
          block
        >
          10팝콘으로 구매하기
        </Button>
      </AntModal>
    </BuyChapterModalStyled>
  );
};

export default BuyChapterModal;
