import styled from "styled-components";

export const MainPageStyled = styled.div`
  &.main-wrap {
    .float-mobile {
      display: none;
    }
    @media (max-width: 768px) {
      .float-web {
        display: none;
      }

      .float-mobile {
        display: block;
      }
    }
  }
`;
