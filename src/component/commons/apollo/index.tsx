import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";
import { useEffect } from "react";

// 리렌더가 되더라도 초기화되지 않게 설정함.
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 1. 프리렌더링 예제 - process.browser 방법
  // if (process.browser) {
  //   console.log("나는 지금 브라우저다!");
  //   const result = localStorage.getItem("accessToken");
  //   setAccessToken(result ?? "");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다. 즉 yarn dev로 실행시킨 프로세스 내부다."
  //   );
  // }
  // 2. 프리렌더링 예제 - typeof window 방법
  // if (typeof window !== "undefined") {
  //   console.log("나는 브라우저야!");
  // } else {
  //   console.log("나는지금 프론트엔드서버다!");
  // }

  // 3. 프리렌더링 무시 - useEffect 방법
  // useEffect(() => {
  //   const result = localStorage.getItem("accessToken");
  //   setAccessToken(result ?? "");
  // }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // cache: new InMemoryCache(), // 글로벌 스테이트값이 저장되는 곳.
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터를 임시저장하는 곳
    cache: new InMemoryCache(),
  });

  // prettier-ignore
  return(
      <ApolloProvider client={client}>
            {props.children}
      </ApolloProvider>

  )
}
