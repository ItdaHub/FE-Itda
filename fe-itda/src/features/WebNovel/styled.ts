import styled from "styled-components";

export const WebNovelStyled = styled.div`
  &.novel-wrap {
    /* 홈 */
    .novel-home {
      /* display: flex; */

      .group-rank {
        width: 20px !important;
      }

      .group-on {
        margin-left: 7px;
      }

      .novel-infoBox {
        display: flex;
      }
    }

    /* 이어쓰기+출품작 */
    .novel-relay {
      display: flex;

      .novel-image {
        margin-right: 10px;

        img {
          height: 150px;
        }
      }
    }

    /* 공통 */
    .novel-title-box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
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
    .novel-image {
      img {
        border-radius: 5px;
        width: 160px;
        height: 200px;
        object-fit: cover;
        overflow: hidden;
      }
    }

    /* 랭크 안보이게 */
    .group-agerank-off {
      display: none;
    }
  }
`;
