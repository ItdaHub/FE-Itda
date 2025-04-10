import styled from "styled-components";

export const WriterProfileStyled = styled.div`
  &.profile-wrap {
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    padding: 30px;
    display: flex;
    align-items: center;
    .profile-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .profile-profile {
        display: flex;
        align-items: center;
      }
    }
    .profile-nickname {
      margin-left: 15px;
      font-size: 17px;
      font-weight: 600;
    }
  }
`;
