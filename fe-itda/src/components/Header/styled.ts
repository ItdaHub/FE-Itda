import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.header-wrap {
    .header {
      display: flex;
      justify-content: space-between;
      width: 1020px;
      margin: 0 auto;
      padding: 0 52px;
      min-height: 102px;

      .header-logo {
        margin-top: 25px;
        &:hover {
          cursor: pointer;
        }
      }

      .header-menu {
        display: flex;
        margin-top: 25px;

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
          margin-left: 8px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .headerOff {
      display: none;
    }
  }
`;
