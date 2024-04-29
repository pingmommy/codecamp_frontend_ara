import { useState } from "react";

export default function CounterStatePage() {
  const result = useState(0);

  function onClickCountUp() {
    result[1](result[0] + 1);
  }

  function onClickCountDown() {
    result[1](result[0] - 1);
  }
  return (
    <div>
      <div>{result[0]}</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
      <button onClick={onClickCountDown}>카운트내리기</button>
    </div>
  );
}
