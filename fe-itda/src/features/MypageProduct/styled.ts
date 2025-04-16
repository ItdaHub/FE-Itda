import styled from "styled-components";

export const MypageProductStyled = styled.div`
  &.mypage-product {
    width: 70%;
    padding: 1rem;

    /* 반응형 스타일 */
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
