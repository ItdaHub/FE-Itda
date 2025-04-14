import styled from "styled-components";
import { Modal } from "antd"; // 예시로 Modal을 사용

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
    margin-top: 20px;
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

  /* Modal 스타일 */
  /* ant-modal 기본 스타일 덮어쓰기 */
  .ant-modal {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background} !important;
    padding: 20px !important;
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    color: white !important;
    border-radius: 8px 8px 0 0 !important;
    padding: 16px !important;
    font-size: 18px !important;
    text-align: center !important;
  }

  .ant-modal-body {
    padding: 16px !important;
    text-align: center !important;
  }

  .ant-modal-footer {
    display: flex !important;
    justify-content: space-between !important;
    padding: 10px !important;
  }

  /* Modal Button 스타일 */
  .ant-btn {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: 4px !important;
    padding: 10px 20px !important;
    font-size: 16px !important;
    cursor: pointer !important;
    transition: background-color 0.3s !important;
  }

  .ant-btn:hover {
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }

  .save-btn {
    display: flex;
    justify-content: flex-end;
    width: 80%;
  }
`;
