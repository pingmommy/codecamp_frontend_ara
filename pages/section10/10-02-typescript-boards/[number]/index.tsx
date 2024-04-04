import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function BoardDetailPage() {
  const router = useRouter();
  //console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
    },
  });

  const onClickEdit = () => {
    router.push(
      `/section10/10-02-typescript-boards/${router.query.number}/edit`,
    );
  };

  return (
    <div>
      <div>{router.query.number}번 게시글로 이동되었어요!</div>
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목:{data?.fetchBoard?.title}</div>
      <div>내용:{data?.fetchBoard?.contents}</div>
      <button onClick={onClickEdit}>수정하기</button>
    </div>
  );
}
