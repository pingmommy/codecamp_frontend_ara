import { useState } from "react";
import Word from "./02-child";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationWithMapParentPage(): JSX.Element {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다.");

  const onClickChange = (): void => {
    setData("영희는 오늘 저녁을 맛없게 먹었습니다.");
  };
  return (
    <>
      <>1번</>
      {/* {data.split(" ").map((el, index) => (
        <Word key={index} el={el} /> // 1. memo()시, key 또는 el이 변경된 부분만 리렌더링됨(즉, "오늘", "먹었습니다."는 버튼을 눌러도 변하는 게 없어서 제외.)
      ))} */}

      <>2번</>
      {data.split(" ").map((el, index) => (
        <Word key={uuidv4()} el={el} /> // 2. memo()를 해도 key 자체가 변경되어 props로 넘어가기 떄문에 5개 모두 리렌더링됨. 잘못된 예!
      ))}

      <button onClick={onClickChange}>CHANGE</button>
    </>
  );
}

// 1번: 안 바뀌는 애들은 유지가 되고 바뀌는 애들만 렌더링된다.

// 2번: 변경되는 props가 부모에서 넘어가면 화면이 그대로처럼 보여도 리렌더링이 일어나는 것이다. key가 변경되는 props로 작동되면 매번 리렌더링이 일어난다.
