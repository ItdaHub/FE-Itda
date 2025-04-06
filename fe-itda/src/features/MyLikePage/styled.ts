import styled from "styled-components";

export const MyLikePageStyled = styled.div`
  &.mylike-wrap {
    max-width: 1020px;
    margin: 0 auto;

    .no-list {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
      font-size: 18px;
      color: #888;
    }
  }
`;
