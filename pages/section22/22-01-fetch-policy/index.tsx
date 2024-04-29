import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";
import FetchPolicyExample from "../../../src/component/unit/22-fetch-policy";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  // 1. 새로운 컴포넌트 등장시에도 글로벌 스테이트값이 유지되는지?
  const onclickIsOpen = (): void => {
    setIsOpen(true);
  };
  // 2. 새로운 페이지이동시에도 글로벌 스테이트값이 유지되는지?
  const onclickMove = (): void => {
    void router.push("/section22/22-01-fetch-policy-moved");
  };

  // 페이지를 이동하면 app.tsx가 다시 실행되고 글로벌 스테이트값이 저장된 캐시메모리가 초기화됨.

  return (
    <div>
      <button onClick={onclickIsOpen}>
        1.버튼을 클릭하면 새로운 컴포넌트가 나타납니다!
      </button>
      {isOpen && <FetchPolicyExample />}
      <button onClick={onclickMove}>
        2.버튼을 클릭하면 페이지가 이동됩니다.
      </button>
    </div>
  );
}
