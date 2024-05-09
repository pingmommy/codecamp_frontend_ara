import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../../src/commons/libraries/asyncFunc";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../src/commons/stores";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loginUser] = useMutation(LOGIN_USER);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const onclickLogIn = async (data: any): Promise<void> => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      setAccessToken(result?.data?.loginUser?.accessToken);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return;
    }

    alert("로그인성공!");
    void router.push("/28/payment/loading");
  };

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onclickLogIn))}>
      <div>
        <input type="text" placeholder="이메일" {...register("email")} />
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        <button>로그인</button>
      </div>
    </form>
  );
}
