import styled from "styled-components";

export const LayoutWrapper = styled.div`
  &.layout-wrap {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }
`;
