import styled from "styled-components";

export const CategoryStyled = styled.div`
  &.category-wrap {
    padding-top: 20px;

    .category-box {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1020px;
      margin: 0 auto;
      .ant-tabs {
        width: 100%;
      }

      .category-row {
        display: flex;

        .category-item {
          margin-right: 50px;
          padding: 8px 12px;
          transition: color 0.2s ease-in-out;
          &:hover {
            cursor: pointer;
          }
        }
        .category-item.active {
          color: purple !important;
          font-weight: bold;
        }
      }

      .mobile-btn {
        display: none;
      }

      @media (max-width: 768px) {
        .write-btn {
          display: none;
        }

        .mobile-btn {
          display: block;
        }
      }
    }

    .category-onwrap {
      border-top: 1px solid #adadad;
      .category-on {
        display: flex;
        align-items: center;
        padding: 0 10px;
        max-width: 1020px;
        margin: 0 auto;
        min-height: 55px;

        .category-item {
          margin-right: 50px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    /* before 가상 요소를 제거 */
    .ant-tabs-nav::before {
      content: none;
    }
    .tabs-container {
      width: 100%;
      position: relative;
    }

    .write-btn,
    .mobile-btn {
      position: absolute;
      top: 15px;
      right: 0px;
      .search-icon {
        margin-right: 15px;
        font-size: 20px;
      }
      .icon {
        font-size: 20px;
      }
    }

    .write-btn:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primary};
    }

    .category-off {
      display: none;
    }
    .search-input-wrapper {
      padding: 8px;
      position: absolute;
      right: 22px;
      top: 30px;
      width: 300px;

      .search-input {
        width: 100%;
        padding: 8px 12px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        outline: none;
      }
    }
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;

      .sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: black;
        position: absolute;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background: #fff;
        padding: 20px 20px 90px 20px;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        transform: translateX(0%);
        transition: transform 0.3s ease-in-out;

        &.closing {
          transform: translateX(100%);
        }

        .sidebar-back {
          padding: 15px 0;
        }
        .sidebar-comment {
          margin-top: 16px;
        }
        .sidebar-menu {
          margin-bottom: 16px;
          font-size: 16px;
          cursor: pointer;
        }
        .sidebar-logout {
          color: rgb(163, 163, 163);
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
`;
