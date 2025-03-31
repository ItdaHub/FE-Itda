import styled from "styled-components";

export const FindPwPageStyled = styled.div`
  &.findpw-wrap {
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }

  .findpw-box {
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

    .findpw-form {
      width: 80%;
    }
  }
  .findpw-id,
  .new-pass,
  .new-passCheck {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    padding: 14px 14px;
    font-size: 15px;
    margin: 3px 0;
    border: 1px solid rgb(214, 222, 235);
  }

  .findPw-btn,
  .changePw-btn {
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
`;
