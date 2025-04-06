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
        .header-login,
        .header-profile {
          display: flex;
          align-items: center;
          margin-left: 15px;
          &:hover {
            cursor: pointer;
          }
        }
        .header-arrow {
          margin-left: 8px;
        }
      }
    }

    .header-charge {
      display: flex;
      justify-self: space-between;
      padding: 8px 10px;
      background-color: #f5f5f5;
      border-radius: 6px;
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

export const NickBox = styled.div`
  display: flex;
  border-radius: 1.125rem;
  max-width: 13.25rem;
  padding: 5px 2px;
  border-color: rgb(0, 0, 0, 0.1);
  border-width: 1px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-style: solid;
  margin-bottom: 1rem;
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background: #f5f5f5;
  border-radius: 6px;
`;

export const ChargeButton = styled.button`
  background: #ffc107;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
`;

export const DarkModeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
`;

export const LogoutText = styled.div`
  color: red;
  border-top: 1px solid #ddd;
  margin-top: 5px;
  padding: 8px 10px;
  cursor: pointer;
`;

export const Menus = styled.div``;
