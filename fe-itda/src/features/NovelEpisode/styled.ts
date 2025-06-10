import styled from "styled-components";

export const NovelEpisodeStyled = styled.div`
  &.novelEpisode-wrap {
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    padding: 30px 10px 0 10px;
    .novelEpisode-btn,
    .novelEpisode-btn-one {
      color: ${({ theme }) => theme.colors.text};
    }

    .novelEpisode-info-box {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .novelEpisode-title {
        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.5px;
        color: #666;
      }

      .novelEpisode-sort {
        display: flex;
        margin-top: 8px;

        .novelEpisode-one::before {
          display: inline-block;
          margin: 3px 14px 0;
          width: 1px;
          height: 12px;
          background-color: #ebebeb;
          content: "";
        }

        .novelEpisode-btn,
        .novelEpisode-btn-one {
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
    .novelEpisode-list {
      padding-left: 20px;
      height: 120px;
      display: flex;
      align-items: center;
    }
    li {
      list-style: none;
    }
  }
`;
