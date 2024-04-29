import { gql, useMutation } from "@apollo/client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LogInPage(): JSX.Element {
  const router = useRouter();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };
  const onclickLogIn = async (): Promise<void> => {
    try {
      const result = await loginUser({
        variables: {
          password,
          email,
        },
      });
      setAccessToken(result?.data?.loginUser?.accessToken);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    alert("로그인성공!");
    void router.push("/21/login-success");
  };

  const wrapAsync = (AsyncFunc: () => Promise<void>) => () => {
    void AsyncFunc();
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>로그인</h1>
      email: <input type="text" onChange={onChangeEmail} />
      password: <input type="password" onChange={onChangePassword} />
      <button onClick={wrapAsync(onclickLogIn)}>로그인하기</button>
    </div>
  );
}
