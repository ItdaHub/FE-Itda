import styled from "styled-components";

export const CommentStyled = styled.div`
  &.comment-wrap {
    padding: 18px 0;

    .reply-box {
      padding-left: 50px;
    }

    .comment-more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #8c8c8c;
    }

    .more {
      cursor: pointer;
    }

    .comment-writer {
      font-weight: 400;
      font-size: 14px;
    }
    .comment-date {
      margin-top: 4px;
      font-size: 0.8125rem;
      font-weight: 400;
      color: #8c8c8c;
    }
    .comment-comment {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .comment-likebox {
      display: flex;
      justify-content: space-between;
    }
    .comment-like {
      display: flex;
      justify-content: flex-end;
      button {
        border: 0.5px solid #c9c9c9;
        border-radius: 2px;
        background-color: transparent;
        margin-right: 6px;
        padding: 5px 7px;
        cursor: pointer;
      }
    }
    .comment-reply-btn {
      span {
        font-size: 12px;
        color: #8c8c8c;
        padding: 5px 8px;
        &:hover {
          cursor: pointer;
          border-radius: 30px;
          background-color: rgb(229, 229, 229);
        }
      }
    }
  }
`;
