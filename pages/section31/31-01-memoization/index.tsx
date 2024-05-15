import { useCallback, useMemo, useState } from "react";

export default function MemoizationPage(): JSX.Element {
  console.log("컴포넌트가 렌더링되었습니다.");
  let countLet = 0; // 값은 올라가지만 화면에 반영은 안된다. 화면에 반영하려면 document. ... 해서 값을 직접 넣어줘야 해서 복잡하다.

  // useMemo 변수기억하기
  const aaa = useMemo(() => Math.random(), []); // use... 로 시작되는 훅들은 어딘가에서 값을 저장하고 있어서 리렌더링되더라도 값이 초기화되지 않는다.
  console.log(aaa);

  const [countState, setCountState] = useState(0); // state값이 변경되면 전부리렌더링되면서 초기화된다. 예를 들면 위의 변수 countLet,aaa는 스테이트값이 변경되고 리렌더링될 때마다 초기화됨.

  // 2. useCallback으로 함수를 기억하기
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 3. useCallback 사용시 주의사항 => state 사용 주의
  const onClickCountState = useCallback((): void => {
    // console.log(countState + 1);
    setCountState((prev) => prev + 1);
  }, []);

  // 4. useMemo로 나만의 useCallback만들어보기 - 대충 이런 원리겠구나 하고 이해하기
  const onClickCountState2 = useMemo(() => {
    return (): void => {
      setCountState((prev) => prev + 1);
    };
  }, []);

  return (
    <>
      <div>카운트(let):{countLet} </div>
      <button onClick={onClickCountLet}>카운트(let)+1</button>
      <div>카운트(state):{countState}</div>
      <button onClick={onClickCountState}>카운트(state)+1</button>
      <div>카운트(state):{countState}</div>
      {/* <button                             // 로직과 UI가 합쳐져서 헷갈림 => 유지보수 힘듦, 메모이제이션 더 복잡함. 그냥 이렇게도 할 수 있다는 것만 알고 가자.
        onClick={useCallback((): void => {
          // console.log(countState + 1);
          setCountState((prev) => prev + 1);
        }, [])}
      >
        카운트(state)+1
      </button> */}
    </>
  );
}

// 좀 복잡한 계산은 리렌더링될 때마다 계산하면 비효율적이니 useMemo를 이용하면 좋다.

// 내 서비스를 사용하는 사람들이 사용하는 컴퓨터는 대부분이 아주 느리다고 생각하고 개발해야 된다.
