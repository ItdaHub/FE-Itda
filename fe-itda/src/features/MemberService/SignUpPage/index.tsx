import clsx from "clsx";
import { LoginStyled } from "./styled";
import { ChangeEvent } from "react";

const SignUpPage = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  return (
    <LoginStyled className={clsx("login-page")}>
      <div className="sign-up">
        <h2>회원가입</h2>
        <form>
          <div>
            <div>아이디</div>
            <input type="text" name="email" placeholder="아이디" required />
            <button>중복확인</button>
          </div>
          <div>
            <div>비밀번호</div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              required
            />
          </div>
          <div>
            <div>비밀번호 확인</div>
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <div>
            <div>닉네임</div>
            <input type="text" name="nickName" placeholder="닉네임" required />
            <button>중복확인</button>
          </div>
          <div>
            <div>이름</div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div>출생년도</div>
            <input
              type="number"
              name="birthYear"
              placeholder="생년월일"
              required
            />
          </div>
          <div>
            <div>휴대폰번호</div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="휴대폰번호"
              required
            />
          </div>

          <div>
            <button>회원가입</button>
          </div>
        </form>
      </div>
    </LoginStyled>
  );
};

export default SignUpPage;
