import styled from "styled-components";

export const NewWriteStyled = styled.div`
  &.newWrite-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .newWrite-box {
      border: 1px solid rgba(0, 0, 0, 0.1);
      height: 500px;
      margin-top: 10px;
      .newWrite-left {
        max-width: 500px;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, 0.1);

        .newWrite-category {
          margin: 30px 3px 0 30px;
        }
        .newWrite-title {
          display: flex;
          margin-right: 30px;
          max-width: 430px;

          Input {
            margin: 10px 3px 0 30px;
          }
          Button {
            margin-top: 10px;
          }
        }
        .newWrite-content {
          margin: 10px 3px 0 30px;
          max-width: 400px;
        }
      }
    }
    .newWrite-btn {
      float: right;
      margin-top: 5px;
    }
  }
`;
