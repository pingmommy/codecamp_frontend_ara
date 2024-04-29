import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  // 1. 로그인 뮤테이션 날려서 accecssToken 받아오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  // 결과타입 인자타입

  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onchangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };
  const onchangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };
  const onclickSubmit = async (): Promise<void> => {
    try {
      // 1. 뮤테이션 날려서 토큰 받아오기
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUser?.accessToken;
      console.log(accessToken);

      // 2. 받아온 accessToken을 globalState에 저장하기
      if (accessToken === undefined) {
        alert("");
        return;
      }
      setAccessToken(accessToken);

      // 아래 코드를 추가한 이유는 변수는 새로고침하면 사라지니까 유지되게 하기 위해서.
      // 보안상 좋은 방법 아니다. 임시 사용하고 나중에 지울 예정!
      localStorage.setItem("accessToken", accessToken);

      // 3.로그인 성공페이지로 이동하기
      void router.push("/section23/23-02-login-localstorage-success");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      이메일: <input type="text" onChange={onchangeEmail} />
      비밀번호 : <input type="password" onChange={onchangePassword} />
      <button onClick={onclickSubmit}></button>
    </>
  );
}
