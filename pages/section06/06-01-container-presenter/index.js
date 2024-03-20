//폴더구조 나누기 실습
//04-02-graphql-mutation 복사하여
//container.js와 presenter.js 나눠서 component폴더에서 관리하기
//클래스에 새폴더 src생성
//src/commons 공통으로 사용될 함수, 기능들 담는 폴더
//src/component/commons 공통컴포넌트를 담는 폴더
//src/component/units 단위컴포넌트를 담는 폴더

import BoardWrite from "../../../src/component/unit/board/write/BoardWrite.container";

export default function ContainerPresenterPage() {
  //한줄일때는 괄호() 필요 없음
  return <BoardWrite />;
}
