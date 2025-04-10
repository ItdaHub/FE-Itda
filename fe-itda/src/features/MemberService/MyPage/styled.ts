import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.my-page {
    margin: 0 auto;
    padding: 0;
    width: 100%;

    .mypage-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.background};
      max-width: 500px;
      padding-top: 60px;
      margin: 0 auto;
      border-radius: 4px;
    }
    .user-edit {
      width: 100%;
      padding: 30px;
      background-color: ${({ theme }) => theme.colors.background};
    }
    .userEdit-image {
      display: flex;
      justify-content: center;
      position: relative;
    }
    .userEdit-image img {
      border-radius: 50%;
      overflow: hidden;
    }

    .edit-icon {
      position: absolute;
      bottom: 0;
      right: 165px;
      cursor: pointer;
    }

    .red-text {
      color: red;
      font-size: 14px;
    }
    .green-text {
      color: green;
      font-size: 14px;
    }

    .userEdit {
      width: 100%;
      height: 45px;
      border-radius: 4px;
      padding: 14px 14px;
      font-size: 15px;
      margin: 3px 0;
      border: 1px solid rgb(214, 222, 235);

      &:focus {
        outline-color: #c47ad7;
      }
    }
  }
  .profile-modal {
    /* display: flex;
      justify-content: center; */
    width: 100%;
  }

  .profile-modal-btn {
    display: flex !important;
    flex-direction: column !important;
    width: 100%;
  }

  .profile-modal-btn button {
    padding: 20px;
  }

  .change-pass,
  .userEdit-nickname {
    display: flex;
    gap: 5px;
  }
  .change-btn,
  .double-check {
    margin: 3px 0;
    width: 18%;
  }
`;
