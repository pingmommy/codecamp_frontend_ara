import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용가능합니다.");
      void router.push("/section23/23-05-login-check-hoc ");
    }
  }, []);
};
