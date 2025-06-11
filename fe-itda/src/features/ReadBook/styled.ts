import styled from "styled-components";

export const ReadBookStyled = styled.div`
  &.readbook-wrap {
    .readbook-page-box {
      max-width: 1020px;
      box-sizing: border-box;
      margin: 0 auto;
      position: relative;
    }

    .readbook-page {
      width: 50%;
      padding: 32px 24px;
      box-sizing: border-box;
      font-size: 16px;
      line-height: 1.7;
      white-space: pre-line;
      position: relative;
      z-index: 2;
    }

    .left {
      border-right: 1px solid transparent;
    }

    .readbook-controls {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      gap: 16px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
      }
    }
    .readbook-page.full {
      width: 100%;
      max-width: 1020px;
      margin: 0 auto;
      padding: 32px 57px 32px 63px;
      font-size: 16px;
      line-height: 1.7;
      white-space: pre-line;
      min-height: 500px;
      box-sizing: border-box;
      word-break: break-word;
      background-color: ${({ theme }) => theme.colors.background};
      border: 1px solid #e0e0e0;
      .readbook-chapnum {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .chapter-number {
      font-size: 20px;
      margin-bottom: 30px;
    }

    .readbook-nav-box {
      height: 60px;
    }

    .readbook-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
      background-color: white;
      z-index: 1000;

      .readbook-list {
        display: flex;
        align-items: center;
        .readbook-noveltitle {
          margin: 0 4px 0 12px;
        }
        .readbook-novelnumber {
          padding-right: 5px;
          font-weight: bolder;
        }
      }

      .readbook-home {
        font-size: 15px;
        cursor: pointer;
      }

      .stick::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 12px;
        background-color: ${({ theme }) => theme.colors.solid};
        margin: 0 8px;
      }
    }

    .novelinfo-like-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 5px;

      &:hover {
        cursor: pointer;
      }
    }

    .novelinfo-profile {
      .novelinfo-image-wrap {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    .footer-nav {
      display: none;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      border-top: 1px solid #eee;
      z-index: 100;

      .heart {
        font-size: 24px;
        cursor: pointer;
      }

      .arrow {
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
      }
    }

    @media (max-width: 768px) {
      .readbook-page {
        width: 100%;
      }

      .readbook-nav .novelinfo-like-box {
        display: none; // 헤더의 하트 숨김
      }

      .footer-nav {
        display: flex;
      }
    }

    /* 챕터 이전,다음화 버튼 */
    .chapter-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 12px 13px;
      font-size: 14px;
      border: none;
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      cursor: pointer;
      z-index: 10;
      transition: background-color 0.3s;
      border-radius: 6px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .chapter-button.prev {
      left: 10px;
    }

    .chapter-button.next {
      right: 10px;
    }

    @media (max-width: 768px) {
      .chapter-button {
        display: none;
      }
    }
  }
`;
