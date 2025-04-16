import styled from "styled-components";
import { Modal } from "antd";

// Modal 래핑
export const StyledModal = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
  }

  .ant-modal-body {
    width: 100%;
    padding: 24px;
  }

  .password-modal-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;

    input {
      width: 100%;
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 6px;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
        box-shadow: 0 0 6px 2px rgba(196, 122, 215, 0.3);
      }
    }

    button {
      padding: 10px 16px;
      font-size: 14px;
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      width: 100%;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 6px 2px rgba(196, 122, 215, 0.3);
      }
    }
  }

  .pass-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 50px;
  }

  .findpw-errorMessage {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    min-height: 18px; /* layout shift 방지용 */
  }

  input.userEdit {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

export const MypageViewStyled = styled.div`
  @media screen and (max-width: 768px) {
    .add-title {
      padding-left: 10px;
    }
    .exit-user {
      padding-left: 10px;
    }
  }
`;
