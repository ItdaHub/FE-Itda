import styled from "styled-components";

export const FindIdPageStyled = styled.div`
  &.findId-wrap {
    margin: 0 auto;
    padding: 0;
    width: 100%;

    .findId-titleBox {
      width: 80%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      .findId-backBtn {
        position: absolute;
        font-size: 20px;
        left: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .findId-box {
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

      .findId-form {
        width: 80%;

        .findId-phone {
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

        .findId-errorMessage {
          color: rgb(230, 73, 56);
          font-size: 12px;
          margin-top: 5px;
        }

        .findId-findBtn {
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
      }

      .findId-foundId {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
`;
