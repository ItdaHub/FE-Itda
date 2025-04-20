import { BuyChapterModalStyled } from "./styled";
import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button } from "antd";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";

interface Props {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  chapter: any;
  novelTitle?: string;
}

const BuyChapterModal = ({
  modalOpen,
  setModalOpen,
  chapter,
  novelTitle,
}: Props) => {
  const [nowCash, setNowCash] = useState<any>();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

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

  const handleBuy = () => {
    console.log("구매 처리 로직");
    setModalOpen(false);
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
          {novelTitle} {chapter}화
        </p>
        <p>
          <strong>보유 팝콘:</strong> {nowCash}개
        </p>
        <Button type="primary" onClick={handleBuy} disabled={nowCash < 2} block>
          2팝콘으로 구매하기
        </Button>
      </AntModal>
    </BuyChapterModalStyled>
  );
};

export default BuyChapterModal;
