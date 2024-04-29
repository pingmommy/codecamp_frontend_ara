import { useMoveToPage } from "../../../src/component/commons/hooks/useMoveToPage";

export default function CustomHooksUseAuthPage(): JSX.Element {
  const { onclickMoveToPage } = useMoveToPage();

  return (
    <>
      <button onClick={onclickMoveToPage("/board")}>게시판</button>
      <button onClick={onclickMoveToPage("/board")}>마 켓</button>
      <button onClick={onclickMoveToPage("/board")}>마이페이지</button>
    </>
  );
}
