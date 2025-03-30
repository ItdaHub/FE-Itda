import styled from "styled-components";

export const SignUpStyled = styled.div`
  .signup-page {
    width: 100%;
    margin: 0 auto;
  }

  .signup-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    max-width: 400px;
    height: auto;
    margin: 60px auto;
    border-radius: 4px;
  }

  .signup-form {
    width: 80%;
  }

  .signup-id,
  .signup-pw,
  .signup-pw-check,
  .signup-nick,
  .signup-name,
  .signup-year,
  .signup-phone {
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

  .same-id-check-btn,
  .same-nick-check-btn {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    font-size: 15px;
    margin: 3px 0;
    border: 1px solid rgb(214, 222, 235);
    border: #c47ad7;
    cursor: pointer;
  }

  .error-message {
    font-size: 14px;
    color: red;
  }

  .signup-btn {
    width: 100%;
    padding: 10px 34px;
    font-size: 16px;
    border-radius: 4px;
    margin-top: 2px;
    border: none;
    background-color: #c47ad7;
    color: white;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed; /* 기본적으로 disabled 상태에서도 포인터 커서 유지 */
      opacity: 0.5; /* 비활성화된 것처럼 보이도록 설정 */
      pointer-events: auto; /* 클릭 이벤트를 허용하려면 auto로 변경 */
    }
  }
`;
