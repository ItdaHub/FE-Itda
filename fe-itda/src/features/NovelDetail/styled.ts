import styled from "styled-components";

export const NovelDetailStyled = styled.div`
  &.noveldetail-wrap {
    .noveldetail-box {
      display: flex;
      max-width: 1020px;
      margin: 0 auto;
      gap: 50px;
      .noveldetail-epi {
        width: 70%;
        @media (max-width: 825px) {
          width: 100%;
        }
      }
      @media (max-width: 825px) {
        display: block;
      }
    }
  }
`;
