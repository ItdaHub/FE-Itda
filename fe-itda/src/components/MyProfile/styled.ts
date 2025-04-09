import styled from "styled-components";

export const NickBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .nickbox {
    border-radius: 1.125rem;
    max-width: 13.25rem;
    padding: 5px 10px;
    border-color: ${({ theme }) => theme.colors.border};
    border-width: 1px;
    cursor: pointer;
    border-style: solid;
    margin-bottom: 1rem;
  }
`;
