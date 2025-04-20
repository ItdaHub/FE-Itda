import styled from "styled-components";

export const NoticeStyled = styled.div`
  &.notice-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .notice-title {
      margin-bottom: 10px;
    }

    .empty-message {
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .collapse {
      border-radius: 0;
    }

    .dropdown-header {
      display: flex;
      flex-direction: column;

      .dropdown-header-title {
        display: flex;
        gap: 10px;

        .urgent {
          color: red;
        }
      }

      .dropdown-header-date {
        color: gray;
      }
    }
    .ant-collapse-header {
      display: flex;
      align-items: center;
    }
  }
`;
