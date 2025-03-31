import styled from "styled-components";

export const CategoryStyled = styled.div`
  &.category-wrap {
    border-bottom: 1px solid #adadad;

    .category-box {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1020px;
      margin: 0 auto;
      min-height: 55px;

      .category-row {
        display: flex;

        .category-item {
          margin-right: 50px;
          &:hover {
            cursor: pointer;
          }
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

    .category-off {
      display: none;
    }
  }
`;
