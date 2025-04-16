import styled from "styled-components";

export const ReadBookStyled = styled.div`
  &.readbook-wrap {
    width: 100%;
    max-width: 1020px;
    box-sizing: border-box;
    margin: 0 auto;

    .readbook-book {
      display: flex;
      min-height: 500px;
      position: relative;
      background-color: ${({ theme }) => theme.colors.background};
      border: 1px solid #e0e0e0;
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
      padding: 32px 24px;
      font-size: 16px;
      line-height: 1.7;
      white-space: pre-line;
      min-height: 500px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chapter-number {
      font-size: 20px;
      margin-bottom: 30px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      color: ${({ theme }) => theme.colors.primary};
    }

    .readbook-nav {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .readbook-home {
        font-size: 15px;
        cursor: pointer;
      }
      .arrow {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;
      }
      button.arrow.prev:disabled,
      button.arrow.next:disabled {
        color: #888;
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

    @media (max-width: 768px) {
      .readbook-book {
        flex-direction: column;
      }

      .readbook-page {
        width: 100%;
      }

      .readbook-book::before {
        display: none;
      }
    }
  }
`;
