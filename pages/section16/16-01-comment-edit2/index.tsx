import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";
import type { MouseEvent } from "react";

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
  const [myIdex, setMyIdex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>): void => {
    const qqq = [...myIdex];
    qqq[Number(event.currentTarget.id)] = true;
    setMyIdex(qqq);
  };
  return (
    <div>
      {data?.fetchBoards.map((el, index) =>
        !myIdex[index] ? (
          <div key={el._id}>
            <span style={{ margin: "10px" }}>{el.writer}</span>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <button id={String(index)} onClick={onClickEdit}>
              edit
            </button>
          </div>
        ) : (
          <input type="text" key={el._id} />
        )
      )}
    </div>
  );
}
