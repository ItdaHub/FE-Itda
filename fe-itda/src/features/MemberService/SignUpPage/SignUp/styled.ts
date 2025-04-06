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
    max-width: 500px;
    height: auto;
    margin: 60px auto;
    border-radius: 4px;
  }

  .signup-form {
    width: 80%;
  }

  .input-box {
    position: relative;
    /* margin-bottom: 10px; */

    p {
      height: 15px;
      line-height: 1;
    }
  }

  .signup-title {
    padding: 0 5px;
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
      outline-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .signup-pwBox {
    position: relative;
  }

  .signup-toggleBtn {
    position: absolute;
    font-size: 18px;
    right: 12px;
    top: 40px;
  }

  .signup-pwBox {
    position: relative;
  }

  .signup-toggleBtn {
    position: absolute;
    font-size: 18px;
    right: 12px;
    top: 40px;
  }

  .same-id-check-btn,
  .same-nick-check-btn {
    /* width: 100%;
    height: 45px; */
    border-radius: 4px;
    font-size: 15px;
    margin: 3px 0;
    cursor: pointer;
    border: none;
    position: absolute;
    top: 30px;
    right: 10px;
    padding: 6px;
    width: auto;
    height: auto;
  }

  .error-message {
    font-size: 14px;
    color: red;
  }
  .green-text {
    color: green;
  }
  .red-text {
    color: red;
  }

  .signup-btn {
    width: 100%;
    padding: 10px 34px;
    font-size: 16px;
    border-radius: 4px;
    margin-top: 2px;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
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
