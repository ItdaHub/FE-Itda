import styled from "styled-components";

export const BackButtonStyled = styled.div`
  &.back-wrap {
    display: none; // 기본 상태 안 보임
  }
  @media (max-width: 768px) {
    &.back-wrap {
      display: flex;
      font-size: 25px;
      margin: 18px;
    }
  }
`;
