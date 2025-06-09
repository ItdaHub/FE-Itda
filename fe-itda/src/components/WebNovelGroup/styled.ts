import styled from "styled-components";

export const WebNovelGroupStyled = styled.div`
  &.group-wrap {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 10px;

    .group-titlebox {
      padding: 50px 0 20px;
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

    .titlebox-off {
      display: none;
    }

    .group-ageTabs {
      &:hover {
        cursor: pointer;
      }
    }

    .group-ageTabs .active {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary};
    }

    .group-ageTab::before {
      display: inline-block;
      margin: 3px 14px 0;
      width: 1px;
      height: 12px;
      background-color: #ebebeb;
      content: "";
    }

    .group-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 3px;
      .group-each {
        margin-right: 5px;
        display: flex;
        justify-content: center;

        .group-rank {
          display: block;
          width: 34px;
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 3px;
        }
      }
    }
    .myfavorite-title {
      font-size: 20px;
      font-weight: 600;
    }

    // 4개
    @media (max-width: 890px) {
      .group-row {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    // 3개
    @media (max-width: 700px) {
      .group-row {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    // 2개
    @media (max-width: 550px) {
      .group-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  &.paddingOff {
    padding: 0;
  }
`;
