import styled from "styled-components";

export const NewWriteStyled = styled.div`
  &.newWrite-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .newWrite-box {
      display: flex;
      border: 1px solid #adadad;
      height: 500px;
      margin-top: 10px;

      .newWrite-AI-Off {
        display: none;
      }
      .newWrite-left {
        width: 50%;
        border-right: 1px solid #adadad;
        .newWrite-content {
          margin: 10px 3px 0 30px;
          max-width: 430px;
        }
      }
      .newWrite-right {
        max-width: 500px;
        width: 50%;
        height: 100%;

        .newWrite-category-box {
          padding-top: 30px;
        }

        .newWrite-category {
          margin: 0px 3px 3px 30px;
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

      .newWrite-rightborder {
        border-right: 1px solid #adadad;
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
    .newWrite-info-box {
      color: rgb(134, 134, 134);
      font-size: 12px;
    }
    .newWrite-info {
      display: flex;
      align-items: start;
      margin-top: 10px;
      .newWrite-info-one,
      .newWrite-info-two {
        margin-left: 5px;
      }
      .newWrite-info-icon {
        margin-top: 2px;
      }
    }

    Input,
    .ant-select-selection-item,
    .ant-select-selection-placeholder,
    TextArea {
      color: ${({ theme }) => theme.colors.placeholder};
      &::placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
      }
    }
  }
`;
