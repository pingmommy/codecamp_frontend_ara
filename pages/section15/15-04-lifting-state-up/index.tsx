import { useState } from "react";
import Child1 from "../../../src/component/unit/15-lifting-state-up/child1";
import Child2 from "../../../src/component/unit/15-lifting-state-up/child2";

export default function CounterStatePage(): JSX.Element {
  const [count, setCount] = useState(0);

  const onClickCount = (): void => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <Child1 count={count} setCount={setCount} />
      <div>==================================================</div>
      <Child2 count={count} onClickCount={onClickCount} />
    </>
  );
}
