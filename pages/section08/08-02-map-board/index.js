//게시판 목록 실습

//섹션 05-03-쿼리-무브 파일 복사하여 실습
//쿼리 부분 fetchBoards로 수정
//number writer title  화면에 렌더링하기
// 상세페이지에서 각 데이터(예 글쓴이)를 클릭하면 어디로 연결될 수도 있음을 유의하며 만들기-각 데이터를 태그로 감싸기
//style={변수}가 원칙이나 간단하게 바로 넣을 때는 style={{변수에 들어갈 속성(마진등)}}을 바로 집어 넣을 수 있다.

import { gql, useQuery } from "@apollo/client";

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

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  console.log(data);
  const bbb = data.fetchBoards.map((el) => <div>{el.number}</div>);
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
    </div>
  );
}
