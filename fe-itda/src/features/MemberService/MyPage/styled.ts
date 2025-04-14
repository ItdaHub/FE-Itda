import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.mypage-wrap {
    font-family: "Pretendard", sans-serif;
    background-color: #f9fbfc;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 100px);

    .mypage-box {
      display: flex;
      gap: 2rem;
      padding: 0 10px;
      width: 80%;
      max-width: 1280px;
    }
  }

  /* 아이콘 */
  .custom-icon {
    color: #aaa;
    font-size: 20px;
  }

  /* 사이드바 영역 */
  .mypage-sidebar {
    background-color: white;
    width: 30%;
    padding: 1rem;
    border-left: 1px solid #ddd;
    box-shadow: 5px 1px 8px 0 rgba(0, 0, 0, 0.06);

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .profile {
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
    }

    .profile-title {
      padding: 20px 20px 40px;
      display: inline-block;
      font-size: 19px;
      line-height: 26px;
      font-weight: 400;
      letter-spacing: -0.8px;
      color: #303038;

      div {
        margin-top: 30px;
      }
    }

    .smartbox {
      padding: 20px;
      border-top: 1px solid rgba(146, 146, 148, 0.3);
      border-bottom: 1px solid rgba(146, 146, 148, 0.3);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  /* 메인 정보 영역 */
  .mypage-info {
    flex: 1;
    padding: 1rem;
    background-color: #f9fbfc;
  }

  .subprofile-basic,
  .subprofile-add {
    margin: 10px 30px 10px 0;
    padding: 10px 20px;
    border-radius: 12px;
    box-shadow: 2px 2px 14px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #ebebeb;
    background-color: #fff;
    box-sizing: border-box;
  }

  .userEdit-info-container {
    margin-top: 1rem;

    .add-title {
      font-weight: 500;
      font-size: 18px;
      margin-top: 30px;
    }
  }

  .userEdit-nickname,
  .userEdit-birth,
  .change-pass,
  .user-name,
  .user-email2,
  .userEdit-phone {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .userEdit-nickname,
  .userEdit-birth {
    border-bottom: 1px solid rgba(146, 146, 148, 0.3);
  }

  .userEdit {
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  .double-check {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #eee;
    cursor: pointer;
    border-radius: 4px;
  }

  .change-pass {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(146, 146, 148, 0.3);
    padding: 0.5rem 0;
    height: 50px;
  }

  .change-btn {
    padding: 5px 8px;
    border: none;
    /* background: none; */
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .profile-modal,
  .password-modal {
    padding: 1rem;
  }

  .profile-modal-btn button {
    display: block;
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border: none;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .password-modal-container input {
    margin-bottom: 0.5rem;
  }

  .mypage-btn button {
    padding: 0.6rem 0;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .mypage-btn button:hover {
    background-color: #555;
  }

  .error-message {
    font-size: 0.9rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }

  .findpw-errorMessage {
    font-size: 0.9rem;
    color: red;
    margin-top: -0.3rem;
    margin-bottom: 0.5rem;
  }

  .red-text {
    color: red;
  }

  .green-text {
    color: green;
  }
`;
