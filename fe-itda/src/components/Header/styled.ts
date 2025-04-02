import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.header-wrap {
    border-bottom: 1px solid #adadad;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 10px;
      min-height: 100px;

      .header-logoBox {
        .header-logo {
          width: 80px;
          height: 80px;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .header-menu {
        display: flex;

        .header-searchBox {
          position: relative;

          .header-searchText {
            display: flex;
            width: 217px;
            height: 33px;
            padding: 0 8px 0 11px;
            border: 1px solid #adadad;
            border-radius: 20px;

            .header-Text {
              background-color: transparent;
              border: none;
              outline: none;
            }
          }
          .header-searchImg {
            position: absolute;
            right: 8px;
            top: 3px;
            &:hover {
              cursor: pointer;
            }
          }
        }

        .header-louder,
        .header-alram,
        .header-login {
          margin-left: 15px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .headerOff {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 10px;
      min-height: 50px;

      .header-logoBox {
        .header-logo {
          width: 80px;
          height: 80px;
        }
        &:hover {
          cursor: pointer;
        }
      }

      .header-menu {
        display: none;
      }
    }
  }
`;
