import styled from "styled-components";

export const CashChargeStyled = styled.div`
  &.charge-wrap {
    width: 100%;
    padding: 20px;
    max-width: 400px;
    height: 240px;
    margin: 0 auto;
    .charge-wrap-box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .charge-popcorn-box {
      display: flex;
      align-items: center;
    }
    .charge-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      .charge-popcorn {
        width: 35px;
      }
    }
  }
`;
