import styled from "styled-components";

export const NovelEpisodeStyled = styled.div`
  &.episode-wrap {
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    padding: 30px 10px 0 10px;

    .episode-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .episode-title {
        font-size: 17px;
        line-height: 20px;
        font-weight: bolder;
        .episode-num {
          margin-left: 4px;
          letter-spacing: -0.3px;
          color: #999;
        }
      }

      .episode-sort {
        display: flex;
        margin-top: 8px;

        li {
          list-style: none;
        }

        .episode-one::before {
          display: inline-block;
          margin: 3px 14px 0;
          width: 1px;
          height: 12px;
          background-color: #ebebeb;
          content: "";
        }

        .episode-btn,
        .episode-btn-one {
          cursor: pointer;
          border: none;
          background: transparent;
          font-size: 16px;
          line-height: 20px;
        }
        .active {
          color: #c47ad7;
        }
      }
    }
  }
`;
