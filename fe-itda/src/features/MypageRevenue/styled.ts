import styled from "styled-components";
import { Modal } from "antd";

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

// Modal 래핑
export const PopcornModal = styled(Modal)`
  .popcorn-modal-container {
    padding: 20px;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .price p {
    margin: 0;
  }

  .account-number {
    margin-bottom: 20px;
  }

  .account-number select,
  .account-number .input-number {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .account-number select {
    margin-bottom: 10px;
  }

  .input-number {
    margin-top: 10px;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: black;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
