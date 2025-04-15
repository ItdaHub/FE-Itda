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
    }
  }
`;
