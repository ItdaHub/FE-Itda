import styled from "styled-components";

export const NoticeStyled = styled.div`
  &.notice-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .notice-title {
      margin-bottom: 10px;
      text-align: center;
    }

    .dropdown-header {
      display: flex;
      flex-direction: column;

      .dropdown-header-title {
        display: flex;
        gap: 10px;
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
