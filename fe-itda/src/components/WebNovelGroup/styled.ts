import styled from "styled-components";

export const WebNovelGroupStyled = styled.div`
  &.group-wrap {
    max-width: 1020px;
    margin: 0 auto;

    .group-title {
      margin-top: 25px;
    }

    .group-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      .group-each {
        margin-right: 5px;
      }
    }
  }
`;
