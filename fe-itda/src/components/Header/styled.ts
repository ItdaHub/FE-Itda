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

    .ant-popover-inner {
      width: 250px !important;
    }
  }
`;

export const WrapContent = styled.div`
  width: 250px;
`;

export const NickBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .nickbox {
    border-radius: 1.125rem;
    max-width: 13.25rem;
    padding: 5px 10px;
    border-color: rgb(0, 0, 0, 0.1);
    border-width: 1px;
    cursor: pointer;
    border-style: solid;
    margin-bottom: 1rem;
  }
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background: #f5f5f5;
  border-radius: 6px;
`;

export const ChargeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
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
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  border-top: 1px solid rgb(0, 0, 0, 0.05);
  height: 3.5rem;
  img {
    margin-right: 3px;
  }
  span {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
`;

export const LogoutText = styled.div`
  text-align: center;
  margin-top: 5px;
  padding: 10px 10px;
  cursor: pointer;
  span {
    box-sizing: border-box;
    color: #656565;
  }
`;

export const Menus = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 15px 0;
  gap: 10px;
  .menu-icon {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .menu-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .comment-icon {
      width: 50px;
    }
    .popcorn-icon {
      width: 50px;
    }
  }
  .menu-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .mywrite {
      width: 50px;
    }
    .heart {
      width: 50px;
    }
  }
`;
