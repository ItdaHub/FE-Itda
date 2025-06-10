import styled from "styled-components";

export const MyPageReadStyled = styled.div`
  &.mypageread-wrap {
    width: 70%;
    padding: 1rem;

    .mypageread-row {
      cursor: pointer;
    }

    /* 반응형 스타일 */
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
