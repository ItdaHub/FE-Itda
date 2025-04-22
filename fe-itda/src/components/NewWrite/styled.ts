import styled from "styled-components";

export const NewWriteStyled = styled.div`
  &.newWrite-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .newWrite-button {
      margin-top: 5px;
    }

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
          margin: 10px 30px 0 30px;
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
          display: flex;
          align-items: center;
          .newWrite-people-info {
            margin-left: 10px;
            .newWrite-people {
              color: rgb(134, 134, 134);
              font-size: 12px;
              margin-left: 3px;
            }
          }
        }
        .newWrite-title {
          max-width: 430px;
          margin: 10px 30px 0 30px;

          Button {
            margin-top: 10px;
          }
        }
        .newWrite-content {
          margin: 10px 30px 0 30px;
          max-width: 430px;
        }
      }

      .newWrite-rightborder {
        border-left: 1px solid #adadad;
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

    .newWrite-btn,
    input,
    .ant-btn,
    textarea,
    .ant-select-selector {
      border: 1px solid #adadad !important;
      border-radius: 3px;
    }

    .newWrite-btn:hover {
      border: 1px solid #adadad !important;
    }

    input:focus,
    textarea:focus,
    .ant-select-selector:focus,
    .ant-select-focused .ant-select-selector {
      border: 1px solid #adadad !important;
    }

    .newWrite-chapter {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      color: #999;
    }

    @media (max-width: 768px) {
      &.newWrite-wrap {
        .newWrite-box {
          display: block;
          height: fit-content;
          padding: 15px 0;
        }
        .newWrite-left {
          width: 100%;
          border-bottom: 1px solid #adadad;
          padding-bottom: 20px;
          border-right: none;
          .newWrite-content {
            margin: 0 auto;
            padding: 0 10px;
          }
        }

        .newWrite-right {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
`;
