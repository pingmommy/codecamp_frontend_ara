import { useState } from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    // state의 값을 가져온다.
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // prev는 임시저장공간에서 가져온다.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  //   function onClickCountDown() {
  //     setCount(count - 1);
  //   }
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
      {/* <button onClick={onClickCountDown}>카운트내리기</button> */}
    </div>
  );
}
