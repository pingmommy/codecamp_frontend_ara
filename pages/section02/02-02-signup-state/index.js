import { useState } from "react";

export default function SignUpStatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickSignUP() {
    //1 검증하기
    if (email.includes("@") === false) {
      setEmailError("이메일이 올바르지 않습니다.");
    } else {
      //2.데이터 보내기

      //3.성공알림
      alert("가입을 축하합니다. ");
    }
  }

  return (
    <div>
      이메일<input type="text" onChange={onChangeEmail}></input>
      <div>{emailError}</div>
      비밀번호<input type="password" onChange={onChangePassword}></input>
      <button onClick={onClickSignUP}>등록하기</button>
    </div>
  );
}
