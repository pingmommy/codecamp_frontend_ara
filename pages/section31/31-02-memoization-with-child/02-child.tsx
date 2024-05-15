import { memo } from "react";

function MemoizationWithChildPage(): JSX.Element {
  console.log("자식이 렌더링됩니다.!");

  return (
    <>
      <div>===================================================</div>
      <div>저는 자식 컴포넌트입니다!</div>
      <div>===================================================</div>
    </>
  );
}

export default memo(MemoizationWithChildPage);
