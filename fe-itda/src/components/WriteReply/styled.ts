import styled from "styled-components";

export const WriteReplyStyled = styled.div`
  &.reply-wrap {
    .reply-place {
      border-bottom: 1px solid #ccc;
      &::placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
      }
    }
    .reply-btn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 10px;
      .reply-cancel {
        cursor: pointer;
        margin-right: 15px;
      }
      .reply-reply {
        border: none;
        border-radius: 5px;
        padding: 2px 3px;
        background-color: ${({ theme }) => theme.colors.button};
      }
      .reply-pointer {
        cursor: pointer;
      }
    }
  }
`;
