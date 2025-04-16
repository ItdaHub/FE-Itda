import styled from "styled-components";

export const MypageRevenueStyled = styled.div`
  &.mypage-revenue {
    width: 70%;
    padding: 1rem;

    .popcorn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    /* 반응형 스타일 */
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
