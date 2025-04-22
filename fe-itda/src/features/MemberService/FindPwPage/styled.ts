import styled from "styled-components";

export const FindPwPageStyled = styled.div`
  &.findpw-wrap {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    /* height: calc(100vh - 100px); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .findpw-titleBox {
      width: 80%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      .findpw-backBtn {
        position: absolute;
        font-size: 20px;
        left: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .findpw-box {
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

      .findpw-form {
        width: 80%;
      }
    }
    .findpw-id {
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

    .findPw-btn {
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
    }

    .findpw-errorMessage {
      color: red;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .findpw-title {
      text-align: center;
    }

    .findpw-toggleBtn {
      position: absolute;
      font-size: 18px;
      right: 15px;
      top: 15px;
    }
  }
`;
