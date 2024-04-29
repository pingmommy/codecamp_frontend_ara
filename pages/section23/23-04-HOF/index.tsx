import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
// import type { MouseEvent } from "react";

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
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (page: number) => (): void => {
    void refetch({ page });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}

      {new Array(10).fill(0).map((_, index) => (
        <span key={index + 1} onClick={onClickPage(index + 1)}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}

// onclick이벤트를 hof으로 변경하여 바인딩
// onClickPage("철수")(event)
// <span key={index + 1} id={String(index + 1)} onClick={onClickPage("철수")}>

// id를 바인딩하는 건 중복된 id가 있으면 의도치 않은 문제가 발생할 수 있다. 이 떄는 hof 방식을 쓰면 좋다.
