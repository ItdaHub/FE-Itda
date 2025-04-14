import styled from "styled-components";
import { Modal } from "antd";

export const MypageEditStyled = styled.div`
  &.mypage-edit {
    width: 70%;
    padding: 1rem;

    form {
      margin: 10px 30px 10px 0;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 2px 2px 14px 0 rgba(0, 0, 0, 0.1);
      border: solid 1px #ebebeb;
      background-color: #fff;
      box-sizing: border-box;
      form {
        max-width: 500px;
        width: 100%;
      }
      input[type="text"],
      button[type="submit"] {
        width: 100%;
      }
    }
  }

  .label {
    display: flex;
    justify-content: center;
  }

  /* 이미지 수정 영역 */
  .userEdit-image {
    display: flex;
    justify-content: center;
    position: relative;
    cursor: pointer;
    width: 150px;
    height: 150px;
  }

  .userEdit-image img {
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  /* 편집 아이콘 위치 */
  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .edit-icon:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  /* 프로필 이미지 변경 모달 */
  .profile-modal {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .profile-modal-btn {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .profile-modal-btn button {
    padding: 12px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .profile-modal-btn button:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  /* 닉네임 입력 필드 */
  .input-nickname {
    display: flex;
    justify-content: center;
  }

  input[type="text"] {
    padding: 14px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }

  input[type="text"]:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  /* 저장하기 버튼 */
  button[type="submit"] {
    width: 80%;
    padding: 12px 20px;
    font-size: 16px;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s;
  }

  button[type="submit"]:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  .save-btn {
    display: flex;
    justify-content: flex-end;
    width: 80%;
  }

  /* 메세지 */
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }

  .success-message {
    color: green;
    font-size: 14px;
    margin-top: 10px;
  }

  .input-nickname {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
  }

  .input-nickname input[type="text"] {
    padding: 14px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
    flex: 1; /* input이 가능한 한 너비 차지하게 */
  }

  .check-button {
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease-in-out;
    margin-top: 0; /* 버튼 세로 간격 제거 */
  }

  .check-button:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
