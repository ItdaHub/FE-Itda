import styled from "styled-components";

export const NovelInfoStyled = styled.div`
  &.novelinfo-wrap {
    .ongoing-text {
      color: ${({ theme }) => theme.colors.profile};
    }
    .novelinfo-wrap-box {
      border-bottom: 1px solid #ebebeb;
      width: 100%;
      max-width: 1020px;
      display: flex;
      padding: 30px 10px 50px 10px;
      margin: 0 auto;

      .novelinfo-infobox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        .novelinfo-btn {
          width: 240px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          background-color: ${({ theme }) => theme.colors.primary};
          border-radius: 4px;
          border: none;
          &:hover {
            cursor: pointer;
          }
        }
      }

      .novelinfo-img {
        object-fit: cover;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        margin-right: 25px;
        width: 170.33px;
        height: 260.33px;
      }
      .novelinfo-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .novelinfo-text-box {
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .novelinfo-text {
            margin-top: 5px;
            font-size: 13px;
            color: #999;
          }
        }
        .novelinfo-like-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .novelinfo-like-wrap {
        display: flex;
      }
    }

    @media (max-width: 767px) {
      .novelinfo-wrap-box .novelinfo-infobox .novelinfo-btn {
        width: 100%;
      }
    }

    @media (max-width: 500px) {
      .novelinfo-wrap-box {
        display: block;
        .novelinfo-img {
          width: 100%;
          margin: 0;
        }
      }
      .novelinfo-wrap-box .novelinfo-infobox .novelinfo-btn {
        margin-top: 10px;
      }
    }
  }
`;
