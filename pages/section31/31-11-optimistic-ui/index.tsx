import { gql, useMutation, useQuery } from "@apollo/client";

import type {
  IMutation,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUIPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: "",
      },
    }
  );

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLike = (): void => {
    void likeBoard({
      variables: {
        boardId: "",
      },
      // refetchQueries:[{}]

      // 응답을 받았다 치고 결과를 안 기다리고 바로 아래 코드로 넘어감.
      // 그 후 쿼리결과가 왔을 때 값을 비교하여 같으면 변경이 없고 다르면 롤백을 한다거나...
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "" },
          data: {
            fetchBoard: {
              _id: "",
              __typename: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };
  return (
    <>
      <div>현재카운트(좋아요):{data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기</button>
    </>
  );
}

/*

요청해서 받은 것은 mutation을 날린 likeBoard 

캐시 안에 있는 것들 중에서 다른 것을 꺼내오는데, 뭐냐면 fetchBoard
 */
