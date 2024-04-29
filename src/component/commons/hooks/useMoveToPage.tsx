import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/stores";

interface IUseMoveToPageReTurn {
  onclickMoveToPage: (path: string) => () => void;
  visitedPage: string;
}

export const useMoveToPage = (): IUseMoveToPageReTurn => {
  const router = useRouter();

  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onclickMoveToPage = (path: string) => () => {
    setVisitedPage(path); // 로그인페이지 일때는 set..하지 않도록 조건 추가해야 한다.
    // localStorage.setItem("visitedPage",path) // 로컬스토리지도 가능!
    void router.push(path);
  };

  return {
    onclickMoveToPage,
    visitedPage,
  };
};

/* 사용하다가 마지막으로 방문한 페이지가 어딘지 알고 싶어요? 
그러면 리코일에서 찾아도 되지만 훅에서 리턴해도 된다.

visitedPage는 저장해놓고 필요할 때 쓰면 된다. 주로 로그인하고 나서 기존 페이지로 이동할 때 사용하면 좋다. 
*/
