import styled from "styled-components";

export const AgreeStyled = styled.div`
  /* 전체 Agree 컴포넌트 스타일 */
  &.agree-service {
    font-family: Arial, sans-serif;
    width: 100%;
    margin: 0 auto;
  }

  /* 약관 박스 스타일 */
  .agree-box {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    background-color: white;
    max-width: 500px;
    height: auto;
    margin: 60px auto;
  }

  /* 제목 스타일 */
  .agree-box h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  /* 체크박스 라벨 스타일 */
  .check-box {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #666;
    justify-content: space-between;
  }

  /* 체크박스 스타일 */
  .check-box input[type="checkbox"] {
    margin-right: 5px;
    transform: scale(1.2);
  }

  /* 필수 항목을 강조하는 스타일 */
  .check-box span {
    color: #e74c3c; /* 빨간색으로 강조 */
    font-weight: bold;
  }

  /* 텍스트 영역 스타일 */
  .term-and-use {
    font-family: Arial, sans-serif;
    width: 100%;
    padding: 20px;
    margin: 10px 0;
    box-sizing: border-box;
    height: 150px;
    background: #fff;
    border: 1px solid #d8d9df;
    font-size: 12px;
    color: #98989f;
    line-height: 1.6em;
    overflow: auto;
    resize: none;
  }

  /* 버튼 */
  .button-wrap {
    display: flex;
    justify-content: center;
  }

  /* 동의 버튼 스타일 */
  button.agree-ok {
    font-size: 16px;
    width: 80%;
    padding: 10px;
    margin-top: 20px;
    border-radius: 30px;
    background-color: #c47ad7;
    border: none;
    color: white;
  }

  button.agree-ok:disabled {
    color: #b2b2b2;
    background-color: #fafafa;
    cursor: not-allowed;
  }

  button.agree-ok:hover:enabled {
    background-color: #c47ad7;
    cursor: pointer;
  }

  /* 모두 동의하기 체크박스 스타일 */
  .check-all {
    margin-bottom: 20px;
    font-weight: bold;
  }

  /* 각 체크박스의 상태가 변경될 때 스타일을 부드럽게 처리 */
  .check-box input[type="checkbox"]:checked {
    background-color: #c47ad7;
    border: 2px solid #c47ad7;
  }
`;
