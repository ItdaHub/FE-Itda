/**
 * 발리체크용
 */

// 전화번호 확인용
export const check = /^\d{3}-\d{4}-\d{4}$/;

// 전화번호 하이픈 추가 및 숫자 개수 제한
export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  let formattedPhone = e.target.value.replace(/[^\d]/g, ""); // 숫자만 추출

  if (formattedPhone.length > 11) {
    return;
  }

  if (formattedPhone.length <= 3) {
    // 3자리까지는 그대로 표시
    formattedPhone = formattedPhone;
  } else if (formattedPhone.length <= 7) {
    // 4~7자리에 하이픈 추가
    formattedPhone = formattedPhone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else {
    // 8자리 이상 하이픈 추가
    formattedPhone = formattedPhone.replace(
      /(\d{3})(\d{4})(\d{1,4})/,
      "$1-$2-$3"
    );
  }

  setPhoneNumber(formattedPhone);
  setErrorMessage(""); // 전화번호 입력 시 에러 메시지 초기화
};
