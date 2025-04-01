import styled from "styled-components";

export const FooterStyled = styled.div`
  &.footer-wrap {
    margin-top: 150px;
    .footer {
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 26px;
      padding-top: 41px;
      padding-bottom: 20px;
      display: flex;
    }

    .footer-div {
      display: block;
      width: 100%;
      height: 1px;
      background: #f0f0f0;
      border: none;
    }

    .footer-topleft {
      display: flex;
      .footer-notice {
        font-weight: bold;
        font-size: 13px;
        line-height: 16px;
        color: #787878;
        width: 100%;
        width: 185px;

        .footer-advice {
          display: flex;
          align-items: center;
          img {
            margin-right: 6px;
            width: 24px;
          }
        }

        .footer-no {
          margin-top: 20px;
          display: flex;
          align-items: center;
          img {
            margin-right: 6px;
            width: 24px;
          }
        }
      }
      .footer-service,
      .footer-etc,
      .footer-company {
        width: 100%;
        width: 185px;
      }
    }

    .footer-company-info {
      margin-top: 60px;
      margin-bottom: 20px;
    }
    .footer-company-name {
      color: #787878;
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      letter-spacing: -0.01em;
      margin-bottom: 10px;
    }
    .footer-use {
      span {
        color: #787878;
        font-size: 11px;
      }
      .footer-span::before {
        content: "";
        display: inline-block;
        background: #f0f0f0;
        width: 1px;
        height: 9px;
        margin: 2px 6px;
      }
    }

    .footer-fin {
      align-items: center;
      color: #787878;
      font-size: 11px;
      font-weight: 600;
      line-height: 13px;
      margin-top: 16px;
    }

    .footer-ser {
      padding: 0;
      margin-bottom: 16px;
      font-size: 12px;
      line-height: 14px;
      color: #787878;
      font-weight: 700;
    }
    .footer-info {
      color: #787878;
      font-size: 13px;
      line-height: 16px;
      padding: 6px 0;
    }
    .footerOff {
      display: none;
    }

    .footer-sns {
      display: flex;
      img {
        margin: 0 3px;
        width: 50px;
        height: 50px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
