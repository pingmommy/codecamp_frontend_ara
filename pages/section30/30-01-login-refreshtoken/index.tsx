import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type {
  IMutation,
  IMutationLoginUserExampleArgs,
} from "../../../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";
import { useRouter } from "next/router";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const LOGIN_USER = gql`
  mutation loginUserExample($email: String, $password: String) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  // 1. 로그인 뮤테이션 날려서 accecssToken 받아오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">,
    IMutationLoginUserExampleArgs
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
      const result = await loginUserExample({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUserExample?.accessToken;
      console.log(accessToken);

      // 2. 받아온 accessToken을 globalState에 저장하기
      if (accessToken === undefined) {
        alert("");
        return;
      }

      // 3.로그인 성공페이지로 이동하기
      setAccessToken(accessToken);
      void router.push("/section30/30-01-login-refreshtoken-seccess");
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
      <button onClick={wrapAsync(onclickSubmit)}></button>
    </>
  );
}
