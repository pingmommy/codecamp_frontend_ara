import { useCallback, useMemo, useState } from "react";
import MemoizationWithChildPage from "./02-child";

export default function MemoizationPage(): JSX.Element {
  console.log("부모컴포넌트가 렌더링되었습니다.");
  let countLet = 0;

  // useMemo 변수기억하기
  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  const [countState, setCountState] = useState(0);

  // 2. useCallback으로 함수를 기억하기
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 3. useCallback 사용시 주의사항 => state 사용 주의
  const onClickCountState = useCallback((): void => {
    setCountState((prev) => prev + 1);
  }, []);

  return (
    <>
      <div>===================================================</div>
      <h1>저는 부모컴포넌트입니다!</h1>
      <div>카운트(let):{countLet} </div>
      <button onClick={onClickCountLet}>카운트(let)+1</button>
      <div>카운트(state):{countState}</div>
      <button onClick={onClickCountState}>카운트(state)+1</button>
      <div>카운트(state):{countState}</div>
      <div>===================================================</div>
      <MemoizationWithChildPage />
    </>
  );
}

// 부모컴포넌트의 countState 값을 올리면 부모뿐 아니라 자식 컴포넌트까지 리렌더링된다.

// 자식 컴포넌트는 리렌더링될 필요가 없는데... 방법이 없을까?? =>  react의 memo() 기능을 사용한다!!
// memo()가 되어 있더라도 만약 countState처럼 리렌더를 trigger하는 값을 props로 자식에게 넘기면 props를 사용하지 않더라도 리렌더된다.

// 모든 컴포넌트에 memo()를 걸어놓으면 메모리를 낭비하게 된다. memo()를 쓴다는 건 어딘가에 컴포넌트가 저장된다는 의미이므로.
// memo()를 쓸 곳 안 쓸 곳을 잘 구분해서 써야 한다. useMemo(), useCallback()도 마찬가지.

/*
memoization 을 써야 하는 이유 : 
 컴포넌트 갯수와 데이터가 많아지면 리렌더링때문에 서비스가 느려진다. 이 때 memo기능을 쓰면 성능이 향상된다.
 현재 포트폴리오같은 작은 규모에서는 사실 별 차이가 없다. 
 그럼에도 오버엔지니어링을 해야 하는 이유는, 취업을 목적으로 한다면 규모 큰 서비스를 다룬다고 
 가정하고 최대한 실무와 비슷한 코드를 작성해야 하기 때문에. 
 늘 내가 만든 서비스를 아주 많은 사람들이 사양이 낮은 컴퓨터로 접근한다는 생각으로 
 성능최적화를 위해 고민해야 한다.
*/
