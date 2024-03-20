// 핵심은 return부분을 컴포넌트로 분리한다.
// 각 컴포넌트별로 state가 생긴다.
import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

import CommentItem from "../../../src/component/unit/16-comment-item/idex";

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

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  return (
    <div>
      {data?.fetchBoards.map((el, index) => (
        <CommentItem key={el._id} el={el}></CommentItem>
      ))}
    </div>
  );
}
