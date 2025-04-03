import styled from "styled-components";

export const NovelInfoStyled = styled.div`
  &.novelinfo-wrap {
    border-bottom: 1px solid #ebebeb;
    width: 100%;
    max-width: 1020px;
    display: flex;
    padding: 50px 10px 50px 10px;
    margin: 0 auto;

    .novelinfo-img {
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      margin-right: 25px;
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

        .novelinfo-btn {
          width: 240px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          background-color: var(--primary-color);
          border-radius: 4px;
          border: none;
          &:hover {
            cursor: pointer;
          }
        }

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
`;
