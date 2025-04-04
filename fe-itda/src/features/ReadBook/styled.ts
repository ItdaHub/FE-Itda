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
      background: #fffdf9;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .readbook-book::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background-color: #ddd;
      z-index: 1;
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
        background-color: #ffeedb;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #ffd9b3;
        }
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
