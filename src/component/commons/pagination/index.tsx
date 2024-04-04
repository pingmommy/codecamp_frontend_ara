import type { ApolloQueryResult } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../commons/types/generated/types";
import type { MouseEvent } from "react";
import { useState } from "react";

interface IPaginationProps {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  lastPage: number;
}

export default function Pagination(props: IPaginationProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      void props.refetch({ page: startPage + 10 });
    }
  };

  return (
    <>
      <div>
        <span style={{ padding: "10px" }} onClick={onClickPrevPage}>
          이전
        </span>
        {new Array(10).fill(0).map(
          (_, index) =>
            index + startPage <= props.lastPage && (
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
    </>
  );
}
