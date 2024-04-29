import { gql, useQuery } from "@apollo/client";
import type {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useEffect } from "react";

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
    FETCH_BOARDS
  );
  const onclickBasket = (basket: IBoard) => () => {
    // 1. 기존 장바구니 가져오기
    const baskets: IBoard[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    );

    // 2. 내가 담은 거 검증 : 이미 담으신 물품이에요
    const temp = baskets.filter((el) => el._id === basket._id); // filter
    if (temp.length >= 1) {
      alert("이미 담으신 물품이에요");
      return;
    }

    // 3.내가 클릭한 거 추가하기
    baskets.push(basket);

    // 4. 추가된 장바구니로 변경하기
    localStorage.setItem("baskets", JSON.stringify(baskets));

    /* 만약 장바구니페이지에서 가져오기도 만들고 싶다면??? useEffect를 사용. 
    그냥  localStorage.getItem("baskets") 이것만 있으면 프리렌더링 시 오류발생 
    프리렌더링..?? 넥스트JS는 브라우저로 보내기 전에 HTML을 미리 그린 후 그 결과를 브라우저에 보낸다. 
    그 후 JS의 함수, 변수등 기능적인 부분들을 추가하여 다시 브라우저에게 보내는데, 이유는 
    사용자에게 화면이라도 미리 보내주기 위함이다. 
    */
    useEffect(() => {
      localStorage.getItem("baskets");
    }, []);
  };
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <button onClick={onclickBasket(el)}>장바구니 담기</button>
        </div>
      ))}
    </div>
  );
}
