import styled from "styled-components";

export const CategoryStyled = styled.div`
  &.category-wrap {
    /* border-bottom: 1px solid #adadad; */

    .category-box {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1020px;
      margin: 0 auto;

      .category-row {
        display: flex;

        .category-item {
          margin-right: 50px;
          padding: 8px 12px;
          transition: color 0.2s ease-in-out;
          &:hover {
            cursor: pointer;
          }
        }
        .category-item.active {
          color: purple !important;
          font-weight: bold;
        }
      }
    }

    .category-onwrap {
      border-top: 1px solid #adadad;
      .category-on {
        display: flex;
        align-items: center;
        padding: 0 10px;
        max-width: 1020px;
        margin: 0 auto;
        min-height: 55px;

        .category-item {
          margin-right: 50px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    /* before 가상 요소를 제거 */
    .ant-tabs-nav::before {
      content: none;
    }
    .tabs-container {
      width: 100%;
      position: relative;
    }

    .write-btn {
      position: absolute;
      top: 15px;
      right: 0px;
    }

    .write-btn:hover {
      cursor: pointer;
      color: var(--primary-color);
    }

    .category-off {
      display: none;
    }
  }
`;
