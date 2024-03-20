//게시글 삭제 실습 - 1.맵에서 키의 중요성 2.프레그먼트의 이해

// 08-02의 양식에 삭제 버튼 추가하기
//삭제버튼에 삭제이벤트 바인딩하기
//삭제이벤트함수 만들기 - 플레이그라운드 보고 만들어야 한다.(deleteBoard)

//리페치 (refetchQueries(배열임):[{query:FETCH_BOARDS}])

//맵과 키 체크박스(키를 사용함.)

//맵에는 인덱스가 있지만 인덱스를 키로 쓰면 예기치 못한 상황이 생길 수 있음
//인덱스는 게시글을 삭제할 때 다음게시글이 올라오면 기존 인덱스가 삭제되는 것이 아니라 기존의 인덱스에 다른 값이 할당되는 것임. 즉 유일하지 않다.

//프레그먼트<>(리액트에 있는) - div가 필요할 때만 쓰고 아닐 떄는 프레그먼트로 한다. div로 하면 div를 쓸데없이 그려야 해서 조금 느려짐

//프레그먼트에 키를 주고 싶을 떄는? <Fragment key={1}></Fragment>

import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [delete_board] = useMutation(DELETE_BOARD);

  //console.log(data);

  const onClickDelete = (event) => {
    // console.log(event.target.id);

    delete_board({
      variables: {
        number: Number(event.target.id),
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el.number}>
          <input type="checkbox" />
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <button id={el.number} onClick={onClickDelete}>
            삭제하기
          </button>
        </div>
      ))}
    </div>
  );
}
