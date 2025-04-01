import styled from "styled-components";

export const ReadBookStyled = styled.div`
  &.readbook-wrap {
    ::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;

    .page {
      width: 100%;
      height: 100%;
      background: white;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
