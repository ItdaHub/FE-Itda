import styled from "styled-components";

export const SearchStyled = styled.div`
  &.search-wrap {
    max-width: 1020px;
    margin: 50px auto;
    padding: 0 10px;

    .group-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      .group-each {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
