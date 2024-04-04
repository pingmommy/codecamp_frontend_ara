import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

import Pagination from "../../../src/component/commons/pagination";
import BoardList from "../../../src/component/unit/15-04-lifting-state-up-pagination";

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

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: BoardsCountData } = useQuery(FETCH_BOARDS_COUNT);

  const lastPage = Math.ceil(BoardsCountData?.fetchBoardsCount / 10);

  return (
    <>
      <BoardList data={data} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </>
  );
}
