import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function DynamicRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: 22175,
    },
  });

  console.log(data);

  return (
    <div>
      <div>1번 게시글로 이동되었어요!</div>
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목:{data?.fetchBoard?.title}</div>
      <div>내용:{data?.fetchBoard?.contents}</div>
    </div>
  );
}
