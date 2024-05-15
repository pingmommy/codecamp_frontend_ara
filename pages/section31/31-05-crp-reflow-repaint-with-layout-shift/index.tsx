import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
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
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <div>
      {(data?.fetchBoards ?? new Array(10).fill(1)).map((el) => (
        <div key={el._id} style={{ height: "30px" }}>
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

// layout shift - 데이터에 따라 레이아웃이 흔들리는 현상

/*
게시글을 서버에서 받아와서 보여주고 
아래쪽에는 게시글을 등록하는 버튼이 있다고 가정해보자. 

처음엔 데이터가 undefined이기 때문에 게시글이 안 보인다. 
그렇기 때문에 게시글 등록버튼만 위쪽에 보인다. 

그 후 데이터가 들어오면
게시글이 나오면서 등록버튼이 원래의 위치인 아래쪽에 보인다. 

이런 현상을 layoutShift라고 하는데, 사용자 경험에 별로 좋지 않다. 

유명한 사이트는 미리 데이터가 들어와야 하는 자리를 계산해서 비워놓는다. 

이렇게 하면 레이아웃을 다시 계산해서 화면을 그리지 않기 때문에 (데이터가 들어올 자리를 미리 비워놨기 때문에)
갑자기 없던 게 튀어 나오거나 위에 있던 게 아래로 다시 그려지는 등 사용자경험에 좋지 않은 현상들을 줄일 수 있다. 

layout shift를 잘 처리해야 한다! 프론트엔드는 디테일싸움이기 때문에!
*/
