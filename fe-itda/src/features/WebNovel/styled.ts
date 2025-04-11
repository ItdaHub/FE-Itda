import styled from "styled-components";

export const WebNovelStyled = styled.div`
  &.novel-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    /* 홈 */
    .novel-home {
      width: 100%;
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
      display: flex;
      font-size: 13px;
      line-height: 17px;
      color: #999;
      .novel-genre {
        margin-right: 5px;
      }
      .novel-likes {
        svg {
          margin-left: 5px;
        }
        &::before {
          display: inline-block;
          content: "";
          width: 1px;
          height: 12px;
          background-color: #999;
        }
      }
    }
    .novel-image {
      img {
        border-radius: 5px;
        width: 100%;
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
