import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.my-page {
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
  .mypage-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    max-width: 500px;
    margin: 60px auto;
    border-radius: 4px;
  }
  .user-edit {
    width: 100%;
    padding: 30px;
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

  .ant-modal-body {
    display: flex;
    justify-content: center;
  }

  .profile-modal-btn {
    display: flex;
    flex-direction: column;
  }
`;
