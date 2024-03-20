import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    try {
      const result = await 나의함수();
      router.push(
        `/section05/05-05-dynamic-routing-boards-mutation-moved/${result.data.createBoard.number}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return <button onClick={onClickSubmit}>GRAPHQL_API 요청하기</button>;
}
