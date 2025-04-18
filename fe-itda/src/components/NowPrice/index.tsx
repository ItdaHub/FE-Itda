import { useEffect, useState } from "react";
import { ChargeButton, NowPriceStyled, TopBox } from "./styled";
import api from "@/utill/api";
import PopcornModal from "../PopcornModal";

interface userIdProps {
  userId?: number;
}

const NowPrice = ({ userId }: userIdProps) => {
  // 현재 가지고 있는 팝콘
  const [nowPrice, setNowPrice] = useState(0);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getCharge = async () => {
      try {
        const res = await api.get(`/popcorn/${userId}`);
        console.log("포인트 응답:", res.data);
        setNowPrice(res.data.total);
      } catch (error) {
        console.error("팝콘개수 불러오기 실패:", error);
      }
    };

    if (userId) {
      getCharge();
    }
  }, [userId]);
  return (
    // 프로필 모달창의 팝콘 현재 개수
    <NowPriceStyled>
      <TopBox>
        <span className="nowprice">{nowPrice}</span>
        <span
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <ChargeButton>충전</ChargeButton>
        </span>

        {/* 팝콘 모달창 */}
        <PopcornModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </TopBox>
    </NowPriceStyled>
  );
};

export default NowPrice;
