import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.header-wrap {
    border-bottom: 1px solid rgb(213, 213, 213);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.background};
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
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
            border: 1px solid ${({ theme }) => theme.colors.border};
            border-radius: 20px;
            background-color: white;

            .header-Text {
              background-color: transparent;
              color: black;
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
          font-size: 22px;

          &:hover {
            cursor: pointer;
          }
          img {
            background-color: white;
            border-radius: 5px;
          }
          .ant-avatar {
            background-color: ${({ theme }) => theme.colors.profile};

            color: ${({ theme }) => theme.colors.background};
          }
        }
        .header-arrow {
          margin-left: 8px;
        }
      }
    }
    .header-nowprice {
      color: black;
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
      background-color: white;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const WrapContent = styled.div`
  &.content-wrap {
    width: 250px;
    .ant-popover-inner {
      background-color: white !important;
    }
  }
`;

export const DarkModeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  color: black;
  height: 3.5rem;
  img {
    margin-right: 3px;
  }
  span {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  .darkimg {
    font-size: 20px;
    margin-right: 3px;
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
  color: black;
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
