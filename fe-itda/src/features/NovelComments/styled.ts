import styled from "styled-components";

export const NovelCommentStyled = styled.div`
  &.novelComment-wrap {
    padding: 30px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    width: 100%;
    max-width: 1020px;
    margin: 42px auto 10px auto;

    li {
      list-style: none;
    }

    .novelComment-review {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .novelComment-review-title {
        font-size: 18px;
        font-weight: 600;
      }
    }
    .stick {
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    }
  }
`;
