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
      width: 150px;
    }

    .random-text {
      font-size: 28px;
      font-family: sans-serif;
    }
  }
`;
