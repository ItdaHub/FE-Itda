import styled from "styled-components";

export const CashHistoryStyled = styled.div`
  width: 100%;
  &.cash-wrap {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 10px;
    .cash-title {
      padding: 50px 0 20px 0;
      font-size: 21px;
      line-height: 26px;
      font-weight: 700;
    }

    .cash-use-box {
      display: flex;
      justify-content: space-between;
      .cash-use {
        color: ${({ theme }) => theme.colors.text};
        border-radius: 1rem;
        background-color: transparent;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 5px 8px;
        margin-right: 10px;
        cursor: pointer;
      }

      .cash-popcorn {
        background-color: #f7f7f7;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 5px 8px;
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .cash-img {
      width: 20px;
    }

    .cash-popcorn-box {
      background-color: #f7f7f7;
      padding: 30px 10px;
      margin: 15px 0;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      .cash-popcorn-num {
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        color: ${({ theme }) => theme.colors.primary};
      }
      .cash-popcorn-unit {
        color: black;
      }
    }

    .active {
      background-color: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.background} !important;
    }
  }
`;
