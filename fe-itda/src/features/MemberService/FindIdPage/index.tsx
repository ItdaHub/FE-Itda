import clsx from "clsx";
import { FindIdPageStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import { check } from "@/utill/vali";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const FindIdPage = () => {
  const router = useRouter();

  // 전화번호
  const [phoneNumber, setPhoneNumber] = useState("");

  // 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  // 찾은 아이디
  const [foundId, setFoundId] = useState("");
  let formattedPhone;

  // 전화번호 하이픈 추가 및 숫자 개수 제한
  const handlePhoneNumberChange = (e: any) => {
    // 숫자가 아닌 것들은 ""로 변경(숫자만 추출)
    formattedPhone = e.target.value.replace(/[^\d]/g, "");

    // 전화번호 길이가 11자리로 제한
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

    // 포맷된 전화번호 상태 업데이트
    setPhoneNumber(formattedPhone);

    // 전화번호 입력 시 에러 메시지 초기화
    setErrorMessage("");
  };

  const validatePhoneNumber = (phone: any) => {
    // 전화번호 유효성 검사 (하이픈 포함)

    return check.test(phone);
  };

  // 아이디 찾기
  const handleFindId = async (e: any) => {
    e.preventDefault();

    if (!phoneNumber) {
      setErrorMessage("전화번호를 입력해주세요");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage("제대로 된 전화번호를 입력해주세요");
      return;
    }

    try {
      // Axios로 GET 요청(아이디 찾기)
      const response = await axios.get("/auth/findid", {
        params: {
          phoneNumber,
        },
      });

      // 아이디가 있으면 화면에 출력
      if (response.data.id) {
        setFoundId(response.data.id);
        // 아이디 찾고 전화번호 비우기
        setPhoneNumber("");
      } else {
        setErrorMessage("해당 전화번호와 일치하는 아이디가 없습니다.");
      }
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다");
    }
  };

  return (
    <FindIdPageStyled className={clsx("findId-wrap")}>
      <div className="findId-box">
        <div className="findId-titleBox">
          <div
            className="findId-backBtn"
            onClick={() => {
              router.push("/login");
            }}
          >
            <LeftOutlined />
          </div>
          <h3 className="findId-title">아이디 찾기</h3>
        </div>

        <form className="findId-form">
          <div>
            <input
              className="findId-phone"
              type="tel"
              name="phoneNumber"
              placeholder="전화번호"
              required
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>

          {/* 오류메시지 */}
          {errorMessage && (
            <div className="findId-errorMessage">{errorMessage}</div>
          )}

          {/* 아이디 찾기 버튼 */}
          <button className="findId-findBtn" onClick={handleFindId}>
            찾기
          </button>
        </form>

        {/* 찾은 아이디 결과 */}
        {foundId && (
          <div className="findId-foundId">
            <p>회원님의 아이디는 다음과 같습니다:</p>
            <div>{foundId}</div>
          </div>
        )}
      </div>
    </FindIdPageStyled>
  );
};

export default FindIdPage;
