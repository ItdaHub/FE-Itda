import styled from "styled-components";

export const AlertPageStyled = styled.div`
  &.alert-wrap {
    .alert-nav {
      display: flex;
      align-items: center;
      border-bottom: 1px solid;
      padding: 8px 6px;
      .alert-tab.active {
        color: ${({ theme }) => theme.colors.primary};
      }
      .alert-tab {
        background-color: transparent;
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        font-weight: 500;
      }
    }

    .alert-item {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      .alert-bold {
        font-weight: 500;
        white-space: nowrap;
      }
      .alert-content-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .alert-date {
          margin-top: 5px;
          text-align: end;
        }
      }
    }
    .alert-white {
      background-color: white;
    }
    .alert-gray {
      background-color: rgb(245, 245, 245);
    }
    .alert-none {
      padding: 10px;
    }
  }
`;
