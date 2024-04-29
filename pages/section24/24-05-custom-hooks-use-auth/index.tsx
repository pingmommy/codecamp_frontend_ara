import { useAuth } from "../../../src/component/commons/hooks/useAuth";

export default function CustomHooksUseAuthPage(): JSX.Element {
  useAuth();
  return <div>프로필페이지입니다.</div>;
}

/* 커스텀 훅은 함수다. 

작동은 함수처럼 동작한다.

커스텀 훅이랑 함수의 차이...?

함수 안에서 use..()가 사용되고 있다면, 그것을 커스텀 훅이라고 한다. 
커스텀훅의 이름은 use로 시작한다.(관례,  use..()가 포함된 함수겠구나..로 이해됨.) 

*/
