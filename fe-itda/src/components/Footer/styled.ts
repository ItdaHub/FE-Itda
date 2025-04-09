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

    .footer-company-info {
      margin: 20px 0;
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
      .footer-name {
        margin-right: 10px;
      }
      .footer-person {
        margin-right: 5px;
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

    a:hover {
      color: #787878;
    }
    @media (max-width: 769px) {
      padding-bottom: 70px;
    }
  }
`;
