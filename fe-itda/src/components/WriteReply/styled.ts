import styled from "styled-components";

export const WriteReplyStyled = styled.div`
  &.reply-wrap {
    .reply-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      .reply-cancel {
        cursor: pointer;
        margin-right: 15px;
      }
      .reply-reply {
        border: none;
        background-color: transparent;
      }
      .reply-pointer {
        cursor: pointer;
      }
    }
  }
`;
