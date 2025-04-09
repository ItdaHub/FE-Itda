import styled from "styled-components";

export const WebNovelStyled = styled.div`
  &.novel-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    /* 홈 */
    .novel-home {
      /* display: flex; */
      width: fit-content;
      &:hover {
        cursor: pointer;
      }

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
      width: fit-content;
      &:hover {
        cursor: pointer;
      }

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

    /* type이 myfavorite인 경우 */
    .myfavorite-image {
      position: relative;
      width: 160px;
      height: 200px;
      img {
        height: 100% !important;
      }

      .myfavorite-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 5px;
      }

      &:hover .myfavorite-overlay {
        opacity: 1;
      }

      .overlay-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 10px;
      }

      .overlay-title {
        font-size: 16px;
        font-weight: bold;
      }

      .overlay-genre,
      .overlay-likes {
        font-size: 14px;
      }

      .overlay-write {
        display: flex;
        justify-content: space-between;
      }
    }
    .novel-info-off {
      display: none;
    }
  }
`;
