import styled from "styled-components";

export const TagInputStyled = styled.div`
  &.taginput-wrap {
    margin-top: 40px;
    .taginput-input {
      border: none !important;
      border-bottom: 1px solid #d9d9d9 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      outline: none !important;

      &:focus,
      &:focus-visible {
        border: none !important;
        border-bottom: 1px solid #d9d9d9 !important;
        box-shadow: none !important;
        outline: none !important;
      }
    }
    .taginput-info-box {
      color: rgb(134, 134, 134);
      font-size: 12px;
      .taginput-info {
        display: flex;
        align-items: start;
        margin-top: 10px;
        .taginput-info-one,
        .taginput-info-two {
          margin-left: 5px;
        }
        .taginput-info-icon {
          margin-top: 2px;
        }
      }
    }
    .taginput-box {
      margin-bottom: 10px;
    }
    .taginput-icon {
      font-size: 12px;
      color: #acacac;
    }
  }
`;
