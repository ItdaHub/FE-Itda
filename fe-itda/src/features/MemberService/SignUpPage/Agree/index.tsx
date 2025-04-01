import clsx from "clsx";
import { AgreeStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Agree = () => {
  // 모두 동의하기 체크박스 상태
  const [allCheck, setAllCheck] = useState(false);
  // 이용 약관 체크박스 상태
  const [useCheck, setUseCheck] = useState(false);
  // 개인 정보 수집 및 이용 동의 체크박스 상태
  const [privacyCheck, setPrivacyCheck] = useState(false);
  // 프로필 정보 추가 수집 동의 체크박스 상태
  const [profileCheck, setProfileCheck] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false); // 동의 여부 상태

  // 모두 동의하기 클릭 시
  const allCheckEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setUseCheck(true);
      setPrivacyCheck(true);
      setProfileCheck(true);
    } else {
      setAllCheck(false);
      setUseCheck(false);
      setPrivacyCheck(false);
      setProfileCheck(false);
    }
  };

  // 이용 약관 클릭 시
  const useCheckEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  // 개인정보 수집 클릭 시
  const privacyCheckEvent = () => {
    if (privacyCheck === false) {
      setPrivacyCheck(true);
    } else {
      setPrivacyCheck(false);
    }
  };

  // 프로필 수집 클릭 시
  const profileCheckEvent = () => {
    if (profileCheck === false) {
      setProfileCheck(true);
    } else {
      setProfileCheck(false);
    }
  };

  // 체크박스가 모두 선택 되면 모두 동의하기 체크박스 체크
  useEffect(() => {
    if (useCheck === true && privacyCheck === true && profileCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [useCheck, privacyCheck, profileCheck]); // 상태가 변경될 때마다 실행

  // "동의" 버튼 활성화 조건 (필수 항목만)
  const isAgree = useCheck && privacyCheck;

  const router = useRouter();

  // 동의 버튼 클릭 시
  const handleAgreeClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <AgreeStyled className={clsx("agree-service")}>
      <div className="agree-box">
        <h3 className="title">약관 동의</h3>
        <form className="agree-form">
          <div className="check-box">
            <label htmlFor="check-all">회원가입 약관에 모두 동의합니다</label>
            <input
              type="checkbox"
              id="check-all"
              value="1"
              checked={allCheck}
              onChange={allCheckEvent}
            />
          </div>

          <div className="check-box">
            <label htmlFor="check-use">
              이용약관<span>(필수)</span>
            </label>
            <input
              type="checkbox"
              id="check-use"
              value="2"
              checked={useCheck}
              onChange={useCheckEvent}
            />
          </div>

          <textarea className="term-and-use" readOnly>
            제 1조 (목적) 주식회사 잇다(이하 '회사')는 이용자에게 다양한 인터넷
            및 모바일 서비스를 보다 편리하게 이용할 수 있도록, 회사 또는
            관계사의 개별 서비스에 모두 접속 가능한 통합 로그인 계정 체계를
            구축하고, 이를 적용한 '잇다 계정 약관' (이하 '본 약관')을
            마련하였습니다. 본 약관은 이용자가 잇다 계정 서비스를 이용하는 데
            필요한 권리, 의무 및 책임사항, 이용 조건 및 절차 등을 규정하고
            있으므로, 약관 내용을 주의 깊게 읽어 주시기 바랍니다. \n 제 2조
            (약관의 효력 및 변경) 본 약관의 내용은 잇다 계정 웹사이트 또는 개별
            서비스의 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에
            동의한 모든 이용자에게 그 효력이 발생합니다. 회사는 필요한 경우 관련
            법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본
            약관이 변경되는 경우, 회사는 변경사항을 시행일자 15일 전부터
            이용자에게 서비스 공지사항에서 공지 또는 통지하는 것을 원칙으로
            하며, 피치 못하게 이용자에게 불리한 내용으로 변경할 경우, 그
            시행일자 30일 전부터 잇다 계정에 등록된 이메일 주소로 이메일(이메일
            주소가 없는 경우 서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를
            띄우는 등의 별도의 전자적 수단) 발송 또는 이용자가 등록한 휴대폰
            번호로 메시지를 발송하는 방법 등으로 개별적으로 알려 드리겠습니다.
            회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터
            개정 약관 시행일 7일 후까지 거부 의사를 표시하지 않으면, 변경된
            약관을 승인한 것으로 봅니다. 이용자가 개정 약관에 동의하지 않을
            경우, 이용자는 이용계약을 해지할 수 있습니다. 제 3조 (약관 외 준칙)
            본 약관에 규정되지 않은 사항에 대해서는 관련 법령 또는 회사가 정한
            개별 서비스의 이용약관, 운영정책 및 규칙 등(이하 '세부지침')의
            규정에 따릅니다. 제 4조 (용어의 정의) 본 약관에서 사용하는 용어의
            정의는 다음과 같습니다. 잇다 계정: 회사 또는 관계사가 제공하는 개별
            서비스를 하나의 로그인 계정과 비밀번호로 회원 인증, 회원 정보 변경,
            회원 가입 및 탈퇴 등을 관리할 수 있도록 회사가 정한 로그인 계정
            정책을 말합니다. 회원: 잇다 계정이 적용된 개별 서비스 또는 잇다 계정
            웹사이트에서 본 약관에 동의하고, 잇다 계정을 이용하는 자를 말합니다.
            관계사: 회사와 제휴 관계를 맺고 잇다 계정을 공동 제공하기로 합의한
            법인을 말합니다. 개별 관계사는 회사의 공식 웹사이트에서 확인할 수
            있으며, 추후 추가/변동될 수 있습니다. 개별 서비스: 잇다 계정을
            이용하여 접속 가능한 회사 또는 관계사가 제공하는 서비스를 말합니다.
            개별 서비스는 추후 추가/변동될 수 있으며, 서비스가 추가/변동될
            때에는 회사의 공식 웹사이트에 변경 사항을 게시합니다. 잇다 계정
            웹사이트: 회원이 온라인을 통해 잇다 계정 정보를 조회 및 수정할 수
            있는 인터넷 사이트를 말합니다. 잇다 계정 정보: 잇다 계정을 이용하기
            위해 회사가 정한 필수 내지 선택 입력 정보로서 잇다 계정 웹사이트
            또는 개별 서비스 내 잇다 계정 설정 화면을 통해 정보 확인, 변경 처리
            등을 관리할 수 있는 회원 정보 항목을 말합니다. 이용기관: 디지털
            서비스와 관련하여 디지털 카드를 제출받거나 확인하여 자신의 업무에
            활용하는 제3자를 말합니다.
          </textarea>

          <div className="check-box">
            <label htmlFor="check-privacy">
              개인정보 수집 및 이용동의<span>(필수)</span>
            </label>
            <input
              type="checkbox"
              id="check-privacy"
              value="3"
              checked={privacyCheck}
              onChange={privacyCheckEvent}
            />
          </div>
          <textarea className="term-and-use" readOnly>
            개인정보 수집 및 이용 동의서 주식회사 잇다(이하 '회사')는 이용자의
            개인정보를 다음과 같이 수집하고 이용합니다. 귀하께서는 본 개인정보
            수집 및 이용에 대해 동의하셔야 회원가입 및 서비스 이용이 가능합니다.
            1. 개인정보 수집 및 이용 목적 회사는 이용자의 개인정보를 다음과 같은
            목적을 위해 수집합니다: 회원가입 및 관리 회원 가입 시 본인 확인,
            서비스 제공 및 이용자 식별을 위한 회원 관리 통계학적 분석을 통한
            마케팅 활동에 활용 광고성 정보 수신에 대해 동의한 회원에게 회사의
            서비스, 이벤트 및 최신 정보 등을 제공 2. 수집하는 개인정보 항목
            회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
            회원가입 시 필수 항목: 이름, 아이디, 비밀번호, 이메일 주소 회원가입
            시 선택 항목: 출생년도, 성별 14세 미만의 경우, 법정대리인의 본인
            인증값을 별도로 수집합니다. 서비스 이용 과정에서 생성 및 수집되는
            항목: IP 주소, 쿠키, 방문일시, OS 종류, 브라우저 종류, 결제 기록,
            서비스 이용 기록, 불량 이용 기록 모바일 앱 사용 시 단말기
            정보(단말기 모델, 하드웨어 ID, 운영체제 버전 정보 등) 3. 개인정보
            보유 및 이용 기간 회사는 수집된 개인정보를 아래와 같은 기간 동안
            보유 및 이용합니다: 회원가입 및 서비스 제공에 필요한 개인정보: 회원
            탈퇴 시까지 보유 및 이용 법적 의무가 있는 경우: 관련 법령에 따라
            일정 기간 보유 예: 상법, 전자상거래 등에서의 소비자 보호에 관한 법률
            등 4. 개인정보의 제공 및 위탁 회사는 이용자의 개인정보를 외부에
            제공하거나 위탁하지 않습니다. 다만, 법령에 의한 요청이 있을 경우에는
            해당 법령을 준수하여 제공할 수 있습니다. 5. 개인정보의 수집 및 이용
            동의 거부 권리 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할
            권리가 있습니다. 다만, 회원가입 시 필수 항목에 대한 수집 및 이용
            동의를 거부할 경우, 서비스 제공이 불가능할 수 있습니다. 서비스
            이용을 위한 최소한의 정보 수집은 반드시 동의하셔야 합니다. 6.
            개인정보 처리방침의 변경 회사는 개인정보 처리방침을 변경할 경우,
            변경된 내용을 즉시 서비스 내에 게시하여 알려드릴 것입니다. 변경된
            사항은 공지된 시행일자로부터 효력이 발생합니다.
          </textarea>

          <div className="check-box">
            <label htmlFor="check-profile">
              프로필 정보 추가 수집 동의<span>(선택)</span>
            </label>
            <input
              type="checkbox"
              id="check-profile"
              value="4"
              checked={profileCheck}
              onChange={profileCheckEvent}
            />
          </div>

          <textarea className="term-and-use" readOnly>
            제 1조 (목적) 주식회사 잇다(이하 '회사')는 이용자에게 다양한 인터넷
            및 모바일 서비스를 보다 편리하게 이용할 수 있도록, 회사 또는
            관계사의 개별 서비스에 모두 접속 가능한 통합 로그인 계정 체계를
            구축하고, 이를 적용한 '잇다 계정 약관' (이하 '본 약관')을
            마련하였습니다. 본 약관은 이용자가 잇다 계정 서비스를 이용하는 데
            필요한 권리, 의무 및 책임사항, 이용 조건 및 절차 등을 규정하고
            있으므로, 약관 내용을 주의 깊게 읽어 주시기 바랍니다. \n 제 2조
            (약관의 효력 및 변경) 본 약관의 내용은 잇다 계정 웹사이트 또는 개별
            서비스의 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에
            동의한 모든 이용자에게 그 효력이 발생합니다. 회사는 필요한 경우 관련
            법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 본
            약관이 변경되는 경우, 회사는 변경사항을 시행일자 15일 전부터
            이용자에게 서비스 공지사항에서 공지 또는 통지하는 것을 원칙으로
            하며, 피치 못하게 이용자에게 불리한 내용으로 변경할 경우, 그
            시행일자 30일 전부터 잇다 계정에 등록된 이메일 주소로 이메일(이메일
            주소가 없는 경우 서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를
            띄우는 등의 별도의 전자적 수단) 발송 또는 이용자가 등록한 휴대폰
            번호로 메시지를 발송하는 방법 등으로 개별적으로 알려 드리겠습니다.
            회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터
            개정 약관 시행일 7일 후까지 거부 의사를 표시하지 않으면, 변경된
            약관을 승인한 것으로 봅니다. 이용자가 개정 약관에 동의하지 않을
            경우, 이용자는 이용계약을 해지할 수 있습니다. 제 3조 (약관 외 준칙)
            본 약관에 규정되지 않은 사항에 대해서는 관련 법령 또는 회사가 정한
            개별 서비스의 이용약관, 운영정책 및 규칙 등(이하 '세부지침')의
            규정에 따릅니다. 제 4조 (용어의 정의) 본 약관에서 사용하는 용어의
            정의는 다음과 같습니다. 잇다 계정: 회사 또는 관계사가 제공하는 개별
            서비스를 하나의 로그인 계정과 비밀번호로 회원 인증, 회원 정보 변경,
            회원 가입 및 탈퇴 등을 관리할 수 있도록 회사가 정한 로그인 계정
            정책을 말합니다. 회원: 잇다 계정이 적용된 개별 서비스 또는 잇다 계정
            웹사이트에서 본 약관에 동의하고, 잇다 계정을 이용하는 자를 말합니다.
            관계사: 회사와 제휴 관계를 맺고 잇다 계정을 공동 제공하기로 합의한
            법인을 말합니다. 개별 관계사는 회사의 공식 웹사이트에서 확인할 수
            있으며, 추후 추가/변동될 수 있습니다. 개별 서비스: 잇다 계정을
            이용하여 접속 가능한 회사 또는 관계사가 제공하는 서비스를 말합니다.
            개별 서비스는 추후 추가/변동될 수 있으며, 서비스가 추가/변동될
            때에는 회사의 공식 웹사이트에 변경 사항을 게시합니다. 잇다 계정
            웹사이트: 회원이 온라인을 통해 잇다 계정 정보를 조회 및 수정할 수
            있는 인터넷 사이트를 말합니다. 잇다 계정 정보: 잇다 계정을 이용하기
            위해 회사가 정한 필수 내지 선택 입력 정보로서 잇다 계정 웹사이트
            또는 개별 서비스 내 잇다 계정 설정 화면을 통해 정보 확인, 변경 처리
            등을 관리할 수 있는 회원 정보 항목을 말합니다. 이용기관: 디지털
            서비스와 관련하여 디지털 카드를 제출받거나 확인하여 자신의 업무에
            활용하는 제3자를 말합니다.
          </textarea>
          <div className="button-wrap">
            <button
              className="agree-ok"
              onClick={(e) => {
                e.preventDefault();
                router.push("/signup");
              }}
              disabled={!isAgree} // 필수 체크박스들이 모두 체크되었을 때만 활성화
            >
              동의
            </button>
          </div>
        </form>
      </div>
    </AgreeStyled>
  );
};

export default Agree;
