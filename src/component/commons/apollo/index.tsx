import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

// 리렌더가 되더라도 초기화되지 않게 설정함.
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
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
  useEffect(() => {
    // 1. 기존방식(refreshTokem 배우기 이전)
    // const result = localStorage.getItem("accessToken");

    // 2. 새로운 방식(refreshToken 배운 이후 )

    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });

    // void getAccessToken().then((newAccessToken) => {
    //   setAccessToken(newAccessToken ?? "");
    // });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          // 아폴로세팅이 끝나고 그 세팅이 전달되고 난 후에야 useMutation useQuery 등을 쓸 수 있다. 여기는 세팅 중이어서 아폴로가 없기 때문에 useMutation useQuery를 쓸 수 없다.
          // 그럼 어떻게? 여기서 mutation 보내야 하는데..??
          // 1. axios를 쓰든가 아니면 다른 라이브러리를 써야 한다.

          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");

              operation.setContext({
                header: {
                  ...operation.getContext().header,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(), // 글로벌 스테이트값이 저장되는 곳.
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터를 임시저장하는 곳
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  return(
      <ApolloProvider client={client}>
            {props.children}
      </ApolloProvider>

  )
}
