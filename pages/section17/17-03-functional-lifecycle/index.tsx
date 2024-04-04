import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function FunctionalCounterPage(): JSX.Element {
  const router = useRouter();
  const [count, setCount] = useState(0);

  // componentDidMount와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행!!");
  }, []);

  // componentDidMount + componentDidUpdate와 동일
  useEffect(() => {
    console.log("변경되고 나서 실행!!");
  });

  useEffect(() => {
    // componentWillUnmount()와 동일
    return () => {
      console.log("사라지기 전에 실행"); // 예>> 채팅방 나가기 API
    };
  }, []);

  // 1. useEffect 하나로 합치기
  useEffect(() => {
    console.log("그려지고 나서 실행!!");

    return () => {
      console.log("사라지기 전에 실행");
    };
  }, []);

  // 배열이 있으면 처음에 한 번만 실행되고 그 다음엔 배열에 들어간 값이 바뀔 때만 실행된다.
  // 배열이 없으면 변경이 일어나면 즉 시작되든 변경이 되든 무슨 일이 일어나면 무조건 재실행
  // [] 배열 안의 값이 감지조건및 기준인데 배열이 없으면 감지조건과 기준이 없으니 무조건 변화가 생기면 재실행되는 것임.
  // [] 의존성배열이라고 한다. Dependency_Array -> 배열에 의존하여 재실행하기 때문에
  /*
   브라우저는 소스파일을 처음부터 차례대로 읽지만 useEffect()는 생명주기함수이기 때문에 
   브라우저가 소스파일문서를 다 읽은 다음에 실행된다. 
  */

  // 2. useEffect의 잘못된 사용법 (1. 추가렌더링, 2.무한루프)

  useEffect(() => {
    // setWriter()  1. 추가렌더링 (useEffect에서 setState를 하면 추가렌더링이 되므로 불가피할 때 빼곤 자제하자.)
    // setCount((prev)=>prev+1)  2. 무한루프(setState에 의해 counter가 바뀌면 변경이 일어났으니 리렌더링 되고 다시 useEffect를 만나면 그 안의 setState가 또 실행되고..->무한루프)
  }, [count]);

  const onClickCountUp = (): void => {
    setCount(1);
  };

  const onClickMove = (): void => {
    void router.push("/");
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트올리기!!</button>
      <button onClick={onClickMove}>나가기</button>
    </>
  );
}
