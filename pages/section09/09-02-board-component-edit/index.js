//컴포넌트의 재사용
//수정&등록페이지는 프레젠터가 똑같고 타이틀만 다르다 => 등록페이지 수정페이지
//중복되는 코드를 컴포넌트로 만들어서 사용하면 좋다.
// 컴포넌트는 등록과 수정이 공유함. isEdit와 같은 불리언변수로 관리
import BoardComponent from "../../../src/component/unit/09-board-component";

export default function BoardEditPage() {
  return <BoardComponent isEdit={false}></BoardComponent>;
}
