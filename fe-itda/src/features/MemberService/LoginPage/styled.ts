import styled from "styled-components";

export const LoginPageStyled = styled.div`
  &.login-wrap {
    margin: 0 auto;
    padding: 0;
    width: 100%;

    .login-title {
      margin-bottom: 10px;
    }

    .login-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;
      max-width: 360px;
      height: 370px;
      margin: 60px auto;
      border-radius: 4px;

      .login-form {
        width: 80%;

        .login-stay {
          display: flex;
          align-items: center;
          margin-top: 5px;
          input:hover {
            cursor: pointer;
          }
          span {
            margin-left: 3px;
            font-size: 12px;
            color: #738096;
            &:hover {
              cursor: pointer;
              color: #c47ad7;
            }
          }
        }

        .login-errorMessage {
          color: rgb(230, 73, 56);
          font-size: 12px;
          margin-top: 10px;
        }

        .login-btn {
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
        }
      }

      .login-id,
      .login-pw {
        width: 100%;
        height: 45px;
        border-radius: 4px;
        padding: 14px 14px;
        font-size: 15px;
        margin: 3px 0;
        border: 1px solid rgb(214, 222, 235);

        &:focus {
          outline: none;
        }
      }
    }

    .login-find {
      margin-top: 20px;
      margin-bottom: 25px;
      color: #808991;

      .login-idFind,
      .login-pwFind,
      .login-signUp {
        font-size: 13px;
        padding: 0 12px;
        &:hover {
          cursor: pointer;
          color: #c47ad7;
        }
      }

      .login-stick {
        width: 1px;
        height: 12px;
        border-left: 1px solid #cccccc;
      }
    }

    .login-logo {
      width: 35px;
      margin-right: 18px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
