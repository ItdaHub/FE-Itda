import styled from "styled-components";

export const EpisodeStyled = styled.div`
  &.episode-wrap {
    .episode-num {
      font-size: 16px;
      line-height: 20px;
      word-break: break-all;
      word-wrap: break-word;
    }

    .episode-info {
      display: flex;
      margin-top: 6px;
      font-size: 13px;
      line-height: 17px;
      color: #999;

      .episode-comment-num {
        margin-right: 10px;
      }
    }
  }
`;
