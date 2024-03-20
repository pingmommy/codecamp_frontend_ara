import { useMutation, gql } from "@apollo/client";

const 나의그래프큐엘셋팅 = gql`
  mutation {
    createBoard(
      writer: "하하"
      title: "안녕하세요."
      contents: "지금은 밤이에요."
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수();
    console.log(result);
  };

  //한줄일때는 괄호() 필요 없음
  return <button onClick={onClickSubmit}>GRAPHQL_API 요청하기</button>;
}
