import { gql, useApolloClient } from "@apollo/client";

import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;
export default function LoginPage(): JSX.Element {
  // 1. 페이지에 접속하면 자동으로 데이터가 받아 와지고 그 데이터는 글로벌스테이트에 저장됨. 리렌더링됨.
  // const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // 2. 버튼 클릭 시 data에 받아지고 (data는 글로벌 스테이트에 저장) 리런데링됨.
  // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3. axios처럼 사용하는 방법(data는 글로벌 스테이트에 저장) - axios처럼 쓸 수 있는데, 아폴로세팅이 되어야 할 수 있다.
  //   const client = useApolloClient()
  // client.query({
  //     query: FETCH_USER_LOGGED_IN
  //   }) // (== axios.get())

  const onclickButton = async (): Promise<void> => {
    const client = useApolloClient();
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    }); // (== axios.get())

    console.log(result);
  };

  // return    <div>{data?.fetchUserLoggedIn?.name}님 환영합니다.</div>

  return <button onClick={wrapAsync(onclickButton)}>클릭하기</button>;
}

// 함수 안에서 use.. 이런 애들이 작동하지 않는다.
// 아폴로에서 받아오는 api의 방법에는 3가지가 있다.
