import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";

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

  return (
    <>
      <div style={{ color: "red" }}>작성자: {data?.fetchBoard?.writer}</div>
      <div style={{ color: "green" }}>제목:{data?.fetchBoard?.title}</div>
      {/* <div>내용:{data?.fetchBoard?.contents}</div> */}
      {typeof window !== "undefined" ? (
        <div
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      ) : (
        <div style={{ color: "blue" }} />
      )}
      <div style={{ color: "brown" }}>주소: 인천시</div>
    </>
  );
}

/*
예시코드와 같은 hydration문제를 
리액트 18 버전에서는 실행이 안 되게끔, 에러가 잡히게끔 만들어놨다.

하이드레이션같은 이런 복잡한 게 왜 있는 거야?
성능 때문이야.
리액트 첫 화면 접속이 느린 거 알아?
맨 처음 접속할 때 모든 페이지의 html css js 를 다 다운로드를 해서 그런 거아니야?
대신 SPA라서 페이지간 이동은 빠르잖아. 
문제는 첫 페이지 접속이 느리다는 거야. 
홈페지에 주소가 많은데, 
모든 주소가 처음 접속은 다 느리다는 거야?
리액트는 모든 페이지를 처음에 다운로드 받기 떄문에 
주소라는 것도 실제 서버주소가 아니고 
브라우저에서 만든 가짜주소야.

어떻게 하면 처음 접속을 빠르게 할 수 있는데?

next.js를 활용해봐
서버에서 먼저 프리렌더링하고 결과를 다운로드 받아서 브라우저에서 하이드레이션 하는 게 맞지?

잘 알고 있네

서버에서도 그리고 브라우저에서 다시 그리면 더 느린거 야니야?

배포할 때 build를 하게 되면 모든 페이지를 미리 그린 .next폴더가 만들어져. 
dev할 때 .next폴더랑은 다른 거야.

ttv(time to view)


*/
