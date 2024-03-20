import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 22175) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD);

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
