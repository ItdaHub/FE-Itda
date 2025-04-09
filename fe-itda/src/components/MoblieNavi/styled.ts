import styled from "styled-components";

export const MoblieNav = styled.div`
  display: none; // 기본 상태 안 보임

  @media (max-width: 768px) {
    display: flex; // 768px 이하일 때 보임
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    border-top: 1px solid #ddd;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;

    a {
      color: #333;
      font-size: 24px;
    }
  }
`;
