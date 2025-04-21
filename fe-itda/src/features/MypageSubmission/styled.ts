import styled from "styled-components";

export const MypageSubmissionStyled = styled.div`
  &.mypage-submission {
    width: 70%;
    padding: 1rem;

    .submission-row {
      cursor: pointer;
    }

    /* 반응형 스타일 */
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
