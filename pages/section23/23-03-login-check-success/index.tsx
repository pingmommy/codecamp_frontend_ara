import { gql, useQuery } from "@apollo/client";
import type { IQuery } from "../../../src/commons/types/generated/types";
import { useEffect } from "react";
import { useRouter } from "next/router";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용가능합니다.");
      void router.push("/section23/23-03-login-check ");
    }
  }, []);
  return (
    <>
      <div>{data?.fetchUserLoggedIn?.name}님 환영합니다.</div>
    </>
  );
}
