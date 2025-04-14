import styled from "styled-components";

export const MypageSidebarStyled = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }

  .profile-title {
    padding: 20px 20px 40px;
    display: inline-block;
    font-size: 19px;
    line-height: 26px;
    font-weight: 400;
    letter-spacing: -0.8px;
    color: #303038;

    div {
      margin-top: 30px;
    }
  }

  .profile-title button {
    font-size: 18px;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
  }

  .profile-title div.active {
    display: inline-block;
    font-weight: 700; /* 두껍게 */
    border-bottom: 2px solid #333; /* 언더라인 */
  }
`;
