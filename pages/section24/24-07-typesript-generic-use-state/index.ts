// 제공자
export function useState<S>(초기값: S): [S, (변경값: S) => void] {
  const state = 초기값;

  const setState = (변경값: S): void => {
    console.log(`${state}에서 ${변경값}으로 값을 변경하겠습니다!!`); // 1. state를 변경하기
    console.log(`변경된 ${변경값}을 사용해서 컴포넌트를 리렌더링하겠습니다`); // 2.해당컴포넌트를 리렌더링 시키기(render함수)
  };

  return [state, setState];
}

// 사용자
const [count, setCount] = useState(10);

/*
사용자가 어떤 타입을 넣을지 모르니, 타입을 고정할 순 없다. 
any를 사용하면 어떤 타입의 값이든 넣을 수 있지만,
any는 타입 고정이 안 되기 때문에 안전하지 못하다. 
어떤 타입의 값이든 넣을 수 있으면서 타입을 고정시킬 수 있는 
Generic을 사용하면 안전하고 유연한 코드를 작성할 수 있다. 

*/
