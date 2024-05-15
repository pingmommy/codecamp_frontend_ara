import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function DynamicRoutingMovedPage(): JSX.Element {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.qqq,
    },
  });

  console.log(data);

  return (
    <div>
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목:{data?.fetchBoard?.title}</div>
      <div>내용:{data?.fetchBoard?.contents}</div>
    </div>
  );
}

/* 쿼리 요청이 코드에 있지만 네트워크 요청도 없고
처음 페이지 접속 시 이미 data가 글로벌스테이트에 있기 때문에

undefined가 아니어서 마치 하드코딩한 것처럼 화면이 바로 뜬다.
(실습페이지나 포트폴리오는 규모가 작은 프로젝트라서 뭘해도 바로 뜨는 것 
  같지만 실은 처음 페이지를 접속했을 때 data 요청이 날라가기 떄문에
  접속 시에는 data가 undefined여서 천천히 보면 화면의 깜빡임이 있다.
)
*/
