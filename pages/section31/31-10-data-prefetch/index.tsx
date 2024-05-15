// 펫치보드를 한다. 게시글을 클릭하면 상세페이지 상세페이지에서 상세글 데이터를 가져온다.
// 게시글 리스트에서 마우스를 올렸을 때 상세페이지 쿼리가 날라간다.(클릭하기 전)
// 상세페이지에서 2번 렌더링되었던 게 처음엔 데이터가 언디파인드였다가 쿼리가 오면 리렌더링 되니까
// 미리 받아놓으면 글로벌스테이트에 저장해놓고
// 상세페이지의 쿼리결과가 글로벌 스테이트에 있어서 상세페이지에서는 쿼리가 안 날라감.
// 렌더링 1번만 됨.

import { gql, useApolloClient, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

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

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const router = useRouter();
  // 함수 안에서는 useQuery 안 된다.

  const client = useApolloClient();

  const prefetchBoard = (boardId: string) => async () => {
    await client.query({
      query: FETCH_BOARD,
      variables: { boardId },
    });
  };

  const onClickMove = (boardId: string) => () => {
    void router.push(`/section31/31-10-data-prefetch-moved/${boardId}`);
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span
            style={{ margin: "10px" }}
            onMouseOver={prefetchBoard(el._id)}
            onClick={onClickMove(el._id)}
          >
            {el.title}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}

/*

프리페치

다음 페이지에서 사용할 html 코드같은 것들을 미리 다운로드하는 것
html Link 태그에서 제공하는 것

그 html 안에  있는 데이터나 css까지 다운로드하는 것은 아니었다.

더 성능을 극대화하여 
다음 페이지에서 사용할 데이터를 미리 다운로드하는 것이 data prefetch
*/

// 문제는 마우스로 목록을 스르륵 훑으면 상세페이지 쿼리가 다 날라간다는 것인데,
// 이건 디바운싱으로 처리한다.
