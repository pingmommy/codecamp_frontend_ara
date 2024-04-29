import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const [searchData, setSearchData] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    // 검색에서 refetch를 할 때 search 검색어가 refetch에 이미 저장되어 있는 상태이므로 추가로  search 포함하지 않아도 됨.
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onchangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchData(event.target.value);
  };

  const onclickSearch = (): void => {
    void refetch({
      search: searchData,
      page: 1,
    });
  };

  return (
    <div>
      검색어입력 : <input type="text" onChange={onchangeSearch} />
      <button onClick={onclickSearch}>검색어입력</button>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
      {new Array(10).fill(0).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
