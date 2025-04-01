import styled from "styled-components";

export const WebNovelGroupStyled = styled.div`
  &.group-wrap {
    max-width: 1020px;
    margin: 0 auto;

    .group-titlebox {
      padding: 8px 0 20px;
      display: flex;
      align-items: center;
      .group-title {
        margin-top: 25px;
        font-size: 17px;
        line-height: 20px;
        font-weight: bolder;
      }
      .group-agecategory {
        margin-top: 25px;
        font-size: 14px;
        color: #999;
      }
    }

    .group-ageTab::before {
      margin: 3px 14px 0;
      width: 1px;
      height: 12px;
      background-color: #ebebeb;
      content: "";
    }

    .group-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      .group-each {
        margin-right: 5px;
      }
    }
  }
`;
