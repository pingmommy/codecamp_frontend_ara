import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId) {
     
    }
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
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

  const [delete_board] = useMutation(DELETE_BOARD);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  interface IPrev {
    __ref: string;
  }

  const onClickDelete = (boardId: string) => (): void => {
    void delete_board({
      variables: { boardId },
      // refetchQueries: [{ query: FETCH_BOARDS }],

      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev: readonly IPrev[], { readField }) => {
              const deletedId = data.deleteBoard; // 삭제완료된 Id
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = (): void => {
    void 나의함수({
      variables: {
        createBoardInput: {
          writer: "하니",
          password: "1234",
          title: "제목이지요",
          contents: "내용이지요.",
        },
      },
      // refetchQueries: [{ query: FETCH_BOARDS }],

      // 추가적인 리페치없이 직접 글로벌스테이트를 수정함.
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}
