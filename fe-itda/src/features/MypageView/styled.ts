import styled from "styled-components";
import { Modal } from "antd";

// Modal 래핑
export const StyledModal = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .ant-modal-body {
    width: 100%;
    padding: 20px;
  }

  .password-modal-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* gap: 20px; */
    height: 100%;

    input {
      margin-bottom: 10px;
    }
    button {
      padding: 5px 10px;
    }
  }

  .findpw-errorMessage {
    color: red;
  }

  input.userEdit {
    padding: 10px 20px;
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
  .findpw-errorMessage {
    color: red;
  }
`;
