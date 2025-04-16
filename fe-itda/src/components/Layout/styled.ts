import styled from "styled-components";

export const LayoutWrapper = styled.div`
  &.layout-wrap {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 80vh;
    }

    .content {
      flex: 1;
      padding-top: 100px;
    }

    @media (max-width: 768px) {
      .content {
        padding-top: 0;
      }
    }

    .no-padding-top {
      .content {
        padding-top: 0 !important;
      }
    }
  }
`;
