import { useState } from "react";

export default function CounterStatePage(): JSX.Element {
  const [count, setCount] = useState(0);

  function onClickCountUp(): void {
    // 1. 화살표함수
    // setCount((prev) => prev + 1); // 화살표 함수에서 return이 없으면 {}를  ()로 변경할 수 있다. ()는 별 의미가 없으면 생략해도 된다.

    // 2. 함수선언식
    // setCount(function (prev) {
    //   // 로직추가가능 - if() for() 등....

    //   return prev + 1;
    // });

    // 3. 매개변수 바꾸기
    setCount((asdf) => asdf + 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
    </div>
  );
}
