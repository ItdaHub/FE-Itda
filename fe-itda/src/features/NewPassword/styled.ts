import styled from "styled-components";

export const NewPassStyled = styled.div`
  &.newpass-wrap {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .newpass-password-box {
      width: 100%;
      max-width: 500px;
      height: 370px;
      margin: 60px auto;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      border-radius: 4px;
    }

    .newpass-title {
      margin: 0 0 10px;
      text-align: center;
    }

    .newpass-input-box {
      height: 80px;
    }

    .newpass-input,
    .newpass-input-check {
      width: 100%;
      height: 45px;
      border-radius: 4px;
      padding: 14px;
      font-size: 15px;
      margin: 3px 0;
      border: 1px solid rgb(214, 222, 235);

      &:focus {
        outline: none;
      }
    }

    .newpass-btn {
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

    .newpass-errorMessage {
      color: red;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .newpass-input-box {
      position: relative;
      width: 100%;
    }

    .newpass-toggleBtn {
      position: absolute;
      font-size: 18px;
      right: 15px;
      top: 15px;
    }
  }
`;
