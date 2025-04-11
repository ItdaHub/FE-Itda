import styled from "styled-components";

export const RandomPassStyled = styled.div`
  &.random-wrap {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 200px);
    text-align: center;

    img {
      margin-bottom: 16px;
      width: 200px;
    }

    .random-text {
      font-size: 34px;
    }
  }
`;
