import styled from "styled-components";

export const PaymentCheckStyled = styled.div`
  .pay-button {
    border: none;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    width: 60px;
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
`;
