import styled from "styled-components";

export const NewWriteStyled = styled.div`
  &.newWrite-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .newWrite-box {
      border: 1px solid #adadad;
      height: 500px;
      margin-top: 10px;
      .newWrite-left {
        max-width: 500px;
        height: 100%;
        border-right: 1px solid #adadad;

        .newWrite-category-box {
          padding-top: 30px;
        }

        .newWrite-category {
          margin: 0px 3px 0 30px;
        }
        .newWrite-title {
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
          max-width: 430px;
        }
      }
    }
    .newWrite-btn {
      float: right;
      margin-top: 5px;
    }
    .newWrite-relay-genre {
      margin: 0px 3px 5px 30px;
      font-size: 13px;
      color: #999;
    }
    .newWrite-relay-title {
      margin: 0px 3px 5px 30px;
      font-size: 15px;
      color: #999;
    }
  }
`;
