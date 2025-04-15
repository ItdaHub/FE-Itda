import { useEffect, useState } from "react";
import { ChargeButton, NowPriceStyled, TopBox } from "./styled";
import api from "@/utill/api";

const NowPrice = ({ userId }: { userId?: number }) => {
  // 현재 가지고 있는 팝콘
  const [nowPrice, setNowPrice] = useState(0);

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
    <NowPriceStyled>
      <TopBox>
        <span className="nowprice">{nowPrice}</span>
        <ChargeButton>충전</ChargeButton>
      </TopBox>
    </NowPriceStyled>
  );
};

export default NowPrice;
