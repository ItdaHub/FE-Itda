import styled from "styled-components";

export const NewWriteStyled = styled.div`
  &.newWrite-wrap {
    .newWrite-ai-toggle {
      margin: 3rem 0 1rem 0;
      text-align: center;

      button {
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: 1px solid #bbb;
        transition: 0.3s;

        &:hover {
          background-color: #f0f0f0;
          border-color: #888;
        }
      }
    }

    .newWrite-ai {
      border: 1px solid #eee;
      border-radius: 12px;
      padding: 0.5rem;
      margin: 1rem;

      .newWrite-label {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .newWrite-content {
        margin: 1rem;
      }
    }

    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .newWrite-box {
      border: 1px solid #adadad;
      margin-top: 10px;

      .newWrite-right {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        .newWrite-category-box {
          padding: 1rem;
          .newWrite-new {
            display: flex;
            margin-bottom: 10px;
            .newWrite-title {
              width: 100%;
            }
          }
        }

        .newWrite-category {
          display: flex;
          align-items: center;
          .newWrite-people-info {
            margin-left: 2px;
          }
          .newWrite-genre-cate {
            margin: 0 5px;
            @media (max-width: 550px) {
              margin-left: 0;
            }
          }
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

    .newWrite-ai-btn {
      margin: 1.2rem 0 1.5rem 0;
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
      margin: 0px 3px 5px 30px;
      font-size: 15px;
      color: #999;
    }

    @media (max-width: 550px) {
      .newWrite-new {
        flex-direction: column-reverse;
      }
      .newWrite-category {
        margin-bottom: 5px;
      }
    }
  }
`;
