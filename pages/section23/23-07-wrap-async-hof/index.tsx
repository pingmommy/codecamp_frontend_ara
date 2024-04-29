import { useMutation, gql } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const 나의그래프큐엘셋팅 = gql`
  mutation {
    createBoard(writer: "하이", title: "안녕", contents: "난공부중!!") {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수();
    console.log(result);
  };

  return (
    <div>
      <button onClick={wrapAsync(onClickSubmit)}>GRAPHQL_API 요청하기</button>
    </div>
  );
}

//
