import styled from "styled-components";

export const WebNovelStyled = styled.div`
  &.novel-wrap {
    .novel-home {
      display: flex;

      .novel-image {
        img {
          border-radius: 5px;
          height: 110px;
          object-fit: cover;
          overflow: hidden;
        }
      }

      .novel-infoBox {
        margin-left: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .novel-title {
          font-size: 16px;
          line-height: 20px;
          color: #000;
        }
        .novel-info {
          font-size: 13px;
          line-height: 17px;
          color: #999;
        }
      }
    }
    .group-agerank-off {
      display: none;
    }
  }
`;
