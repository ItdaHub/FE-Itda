import styled from "styled-components";

export const ProfileImageStyled = styled.div`
  /* sidebar 스타일 */
  &.sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid rgba(146, 146, 148, 0.3);

    .profile-image {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 3px 6px 0 rgba(29, 34, 53, 0.08);
    }

    .profile-user {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 0 40px;
    }

    .user-nick {
      font-size: 26px;
      font-weight: 700;
      color: #1c1c1c;
      line-height: 32px;
    }

    .user-email {
      font-size: 14px;
      color: #848896;
      padding: 10px 0;
    }
  }

  /* contain 스타일 */
  &.contain {
    display: flex;
    gap: 10px;
    align-items: center;
    border-bottom: 1px solid rgba(146, 146, 148, 0.3);
    margin: 10px 0;

    .profile-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }

    .profile-user {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .user-nick {
      font-size: 18px;
      font-weight: 600;
      color: #1c1c1c;
    }

    .user-email {
      font-size: 14px;
      color: #848896;
    }
  }
`;
