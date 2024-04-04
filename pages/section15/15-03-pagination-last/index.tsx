import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import type { MouseEvent } from "react";
import { useState } from "react";

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

  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      void refetch({ page: startPage + 10 });
    }
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
      <span style={{ padding: "10px" }} onClick={onClickPrevPage}>
        이전
      </span>
      {new Array(10).fill(0).map(
        (_, index) =>
          index + startPage <= lastPage && (
            <span
              style={{ padding: "10px" }}
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </span>
          )
      )}
      <span style={{ padding: "10px" }} onClick={onClickNextPage}>
        다음
      </span>
    </div>
  );
}
