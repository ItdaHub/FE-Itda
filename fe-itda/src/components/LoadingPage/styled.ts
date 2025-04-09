import styled from "styled-components";

export const LoadingPageStyled = styled.div`
  &.loading-wrap {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 93vh;
    text-align: center;
    background-color: #fdfbf9;

    img {
      margin-bottom: 16px;
      width: 200px;
    }
    p {
      font-weight: 700;
      font-size: 25px;
    }
  }
`;
