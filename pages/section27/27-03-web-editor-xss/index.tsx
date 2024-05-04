import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, setValue, trigger, handleSubmit } = useForm({
    mode: "onChange",
  });

  // ReactQuill 만든 사람들이 만든 onchange이므로 event는 안 들어옴.
  const onchangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고 강제로 값을 넣어주는 기능!
    setValue("contents", value === "<p><br/></p>" ? "" : value);

    // onchange 됐으니까 에러검증 같은 것들을 해달라고 react-hook-form에 알려주는 기능
    void trigger("contents");
  };

  const onclickSubmit = async (data: any): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.content,
        },
      },
    });
    const { Modal } = await import("antd"); // code-splitting
    Modal.success({ content: "게시글 등록에 성공하였습니다." });
    const boardId = result.data?.createBoard._id;
    void router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`);
  };
  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onclickSubmit))}>
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
