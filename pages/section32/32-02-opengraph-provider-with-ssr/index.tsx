// 제공자일때 => 네이버 다음 쿠팡 등

import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";
const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;
export default function OpenGraphProviderPage(props: any): JSX.Element {
  // const { data } = useQuery(FETCH_USEDITEM, {
  //   variables: { useditemId: "..." },
  // });
  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
      <div>중고마켓에 오신것을 환영합니다! (여기는 body입니다.)</div>
    </>
  );
}

// getServerSideProps 이미 존재하는 단어이므로 내 마음대로 변경 불가능. 서버에서만 실행한다.  ,<=> useEffect()는 브라우저에서만 실행되는 것이었는데~
// getServerSideProps() 이것이 가장 먼저 실행됨. 백엔드에 데이터요청하는 로직을 여기에 작성해야 한다.
// getServerSideProps()가 실행되는 곳은 서버여서 아폴로세팅하고 관련없는 곳이다.
// graphql-request 를 쓰거나 axios 형태로 요청을 보내야 한다.

// 여기는 서버에서만 실행됨. (프론트엔드 서버프로그램 => webpack  서버 프로그램)
export const getServerSideProps = async (): Promise<any> => {
  console.log("여기는 서버입니다.");

  // 여기서 API 요청
  const graphQLClient = new GraphQLClient(
    "https://backend-codebootcamp.co.kr/graphql"
  );
  const result = await graphQLClient.request(FETCH_USEDITEM, {
    useditemId: "...",
  });

  // 받은 결과를 return  -> 이걸 프롭스에서 받아서 렌더링을 하겠죠? 어디서 서버에서! 그래서 서버사이드렌더링! 그 결과 데이터가 렌더링된  완벽한 HTML이 화면에 보여질 수 있다.
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};

/*
서버사이드렌더링은 서버에서 데이터까지 다 그려서 브라우저로 보내는 것이다.

검색엔진최적화가 필요한 페이지이다, 다이나믹 오픈그래프가 필요하다(상세페이지)
그 때 서버사이드렌더링을 하면 된다! 

 */
