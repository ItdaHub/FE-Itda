import styled from "styled-components";

export const WriteCommentStyled = styled.div`
  &.writeComment-wrap {
    .writeComment-mycomment {
      background-color: ${({ theme }) => theme.colors.background};
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      .writeComment-nick {
        padding: 17px 17px 0;
        display: flex;
        align-items: center;
        height: auto;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .writeComment-write-box {
        padding: 8px 17px 0;
        width: 100%;
        height: 65px;
        max-height: 65px;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.3125rem;
        color: #111111;
        .writeComment-write {
          color: ${({ theme }) => theme.colors.text};
          border: none;
          outline: none;
          background-color: ${({ theme }) => theme.colors.background};
        }
      }
      .writeComment-number {
        padding: 8px 11px 7px;
        color: #a6a6a6;
        font-size: 12px;
        line-height: 14px;
      }

      .writeComment-numbox {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 8px 11px 7px;
      }
      .writeComment-sendbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #e0e0e0;
      }
      .changeColor {
        background-color: #c47ad7;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
