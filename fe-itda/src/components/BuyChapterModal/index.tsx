import { BuyChapterModalStyled } from "./styled";
import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button } from "antd";
import api from "@/utill/api";
import { App as AntdApp } from "antd";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import PopcornModal from "../PopcornModal";
import clsx from "clsx";

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
  const [modal2Open, setModal2Open] = useState(false);
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

    setModal2Open(!modal2Open);
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
    <BuyChapterModalStyled className={clsx("buyModal-wrap")}>
      <AntModal
        title="회차 결제"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={300}
      >
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 5,
          }}
        >
          {novelTitle} {chapter}화
        </p>
        <p style={{ textAlign: "right" }}>
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
      <PopcornModal
        novelId={novelId}
        chapterId={chapterId}
        type="read"
        modalOpen={modal2Open}
        setModalOpen={setModal2Open}
      />
    </BuyChapterModalStyled>
  );
};

export default BuyChapterModal;
