import styled from "styled-components";

export const NowPriceStyled = styled.div``;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-radius: 6px;
  color: black;
`;

export const ChargeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
`;
