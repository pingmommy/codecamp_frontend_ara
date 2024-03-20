//컴포넌트의 함수 첫 글자는 항상 대문자.
//BoardWriteUI
import { BlueButton } from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return (
    <div>
      작성자: <input type="text" onChange={props.onChangeWriter} />
      제목: <input type="text" onChange={props.onChangeTitle} />
      내용: <input type="text" onChange={props.onChangeContents} />
      <BlueButton onClick={props.onClickSubmit}>
        GRAPHQL_API 요청하기
      </BlueButton>
    </div>
  );
}
