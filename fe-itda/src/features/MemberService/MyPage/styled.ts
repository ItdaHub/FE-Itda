import styled from "styled-components";

export const MyPageStyled = styled.div`
  &.mypage-wrap {
    font-family: "Pretendard", sans-serif;
    /* background-color: #f9fbfc; */
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

    /* 반응형 스타일 */
    @media screen and (max-width: 768px) {
      flex-direction: column; /* 모바일에서 세로 방향으로 정렬 */
      justify-content: flex-start;

      .mypage-box {
        width: 100%;
        max-width: 1280px;
      }

      /* 수정 모드 (내 정보 수정) */
      .mypage-edit {
        width: 100%;
        form {
          margin: 10px;
        }
      }

      /* 읽기 모드 (내 프로필) */
      .mypage-info {
        width: 100%;
        .subprofile-basic,
        .subprofile-add {
          margin: 10px;
        }
      }
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
    width: 70%;
    padding: 1rem;
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

  /* .double-check {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #eee;
    cursor: pointer;
    border-radius: 4px;
  } */

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

  /* 메세지 color 지정 */
  .red-text {
    color: red;
  }

  .green-text {
    color: green;
  }

  /* 모바일 부분 - 버튼 (내 프로필 & 내 정보 수정) */
  .mobile-profile-menu {
    display: none;
  }

  /* 반응형 설정 */
  @media screen and (max-width: 768px) {
    .mobile-profile-menu {
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 12px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;

      button {
        font-size: 18px;
        font-weight: 500;
        background: none;
        border: none;
        cursor: pointer;
      }

      button.active {
        font-weight: 700; /* 두껍게 */
        border-bottom: 2px solid #333; /* 언더라인 */
      }
    }
  }
`;
