// 라이브러리와 css-in-js 실습
// 잘못된 아이콘 사용법 실습 - event.target.id하면 찾을 수 없음. 왜냐면 클릭하는 ant아이콘은 <svg>태그고 이를 <span>이 감싸는 형태로 돔에 추가되는데,
//  <svg>는 일반적인 HTML요소가 아니어서 예상대로 작동하지 않을 수 있음.
// ant아이콘에 이벤트핸들러를 등록하려면 부모요소를 추가하고 이벤트버블링을 활용하여야 함.
import { UpCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import type { MouseEvent } from "react";
const MyIcon = styled(UpCircleOutlined)`
  color: red;
  font-size: 50px;
`;

export default function LibraryIconPage(): JSX.Element {
  const onclickDelete = (event: MouseEvent): void => {
    console.log(event.currentTarget.id);
  };

  return (
    <div id="삭제할게시글ID" onClick={onclickDelete}>
      <MyIcon rev="site" id="삭제할 게시글ID" onClick={onclickDelete} />
    </div>
  );
}
