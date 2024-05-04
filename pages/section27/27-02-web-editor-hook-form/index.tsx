import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const { register, setValue, trigger } = useForm({ mode: "onChange" });

  // ReactQuill 만든 사람들이 만든 onchange이므로 event는 안 들어옴.
  const onchangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고 강제로 값을 넣어주는 기능!
    setValue("contents", value === "<p><br/></p>" ? "" : value);

    // onchange 됐으니까 에러검증 같은 것들을 해달라고 react-hook-form에 알려주는 기능
    void trigger("contents");
  };

  const onclickSubmit = async (): Promise<void> => {
    const { Modal } = await import("antd"); // code-splitting
    Modal.success({ content: "게시글 등록에 성공하였습니다." });
  };
  return (
    <form onSubmit={wrapFormAsync(onclickSubmit)}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제 목: <input type="text" {...register("title")} />
      <br />
      내 용:
      <ReactQuill onChange={onchangeContents} />
      <button>등록하기</button>
    </form>
  );
}

/*
<ReactQuill onChange={onchangeContents}  {...register("contents")} /> => 이거 안 된다.

*/
