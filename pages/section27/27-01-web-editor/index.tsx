import dynamic from "next/dynamic";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

/*
ReactQuill은 프론트엔드서버에서 임포팅을 해서 쓰려고 하면 에러난다. 
브라우저에서 임포팅해야 하는데, 이럴 때 다이나믹 임포트를 쓰면 좋다. 
 바르게 적용되려면 반드시 프론트 서버에서 따로 css파일도 임포팅해야 한다.
*/

// 다이나믹 임포트 = 내가 원하는 시점에 임포트하는 기능

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  // ReactQuill 만든 사람들이 만든 onchange이므로 event는 안 들어옴.
  const onchangeContents = (value: string): void => {
    console.log(value);
  };

  // 클릭하고 임포트하려니까 너무 느리다. 그러니까 렌더링 먼저하고 여유있을 때 임포트를 해놓자.라는 생각이 들 때 쓰면 좋은 코드.
  // 이 코드는 잘 쓰면 좋은데, 코드가 좀 복잡해질 수 있다.
  useEffect(() => {
    async function aaa(): Promise<void> {
      const { Modal } = await import("antd"); // code-splitting
      Modal.success({ content: "게시글 등록에 성공하였습니다." });
    }
    void aaa();
  }, []);

  // 보통 이 방법이 가장 깔끔하다.
  const onclickSubmit = async (): Promise<void> => {
    const { Modal } = await import("antd"); // code-splitting
    Modal.success({ content: "게시글 등록에 성공하였습니다." });
  };
  return (
    <form onSubmit={wrapFormAsync(onclickSubmit)}>
      작성자: <input type="text" />
      <br />
      비밀번호: <input type="password" />
      <br />
      제 목: <input type="text" />
      <br />
      내 용:
      <ReactQuill onChange={onchangeContents} />
      <button>등록하기</button>
    </form>
  );
}

// 쓰일지 안 쓰일지 모를 기능들을 무조건 다 다운로드하면 첫페이지 로딩이 느려짐 => 다이나믹 임포트를 쓰면 좋다.
