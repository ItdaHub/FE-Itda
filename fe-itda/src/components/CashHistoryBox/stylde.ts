import styled from "styled-components";

export const CashHistoryBoxStyled = styled.div`
  &.history-wrap {
    .history-row {
      border-bottom: 1px solid #e5e7eb;
      padding: 15px;
      .history-popcorn {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: 13px;
        line-height: 18px;
        font-weight: 700;
      }
      .history-title {
        font-size: 13px;
        line-height: 18px;
      }
      .history-date {
        margin-top: 6px;
        color: #999;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .history-off {
        display: none;
      }
    }
  }
`;
