import styled from "styled-components";

export const NovelRecommendStyled = styled.div`
  &.novelrecommend-wrap {
    width: 30%;
    margin-top: 22px;
    .novelrecommend-title-box {
      border-bottom: 1px solid #ebebeb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-bottom: 15px;
      .novelrecommend-title {
        font-size: 17px;
        line-height: 21px;
        font-weight: 600;
      }
    }
    .novelrecommend-row {
      .novelrecommend-one {
        cursor: pointer;
        display: flex;
        gap: 12px;
        margin-bottom: 8px;
        .novelrecommend-img-box {
          width: 80px;
          height: 100px;
          object-fit: cover;
          border-radius: 3px;
          overflow: hidden;
          .novelrecommend-img {
            width: 80px;
            height: 100px;
          }
        }
        .novelrecommend-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          row-gap: 2px;
          .novelrecommend-title {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font-size: 15px;
            font-weight: 600;
            line-height: 20px;
          }
          .novelrecommend-nick {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font-size: 14px;
            line-height: 18px;
            font-weight: 500;
            color: #000;
            word-break: break-word;
          }
        }
      }
      @media (max-width: 825px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 710px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 493px) {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
      }
    }
    @media (max-width: 825px) {
      width: 100%;
      padding: 0 10px;
      margin-top: 50px;
    }
  }
`;
