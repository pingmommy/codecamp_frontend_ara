import { gql, useMutation } from "@apollo/client";
import * as S from "./writer.style";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../../src/commons/libraries/asyncFunc";
import { useRouter } from "next/router";
import type {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../../src/commons/types/generated/types";
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
export default function EditorPage(): JSX.Element {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();
  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(나의그래프큐엘셋팅);

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });
    void router.push(`/27/editor/detail/${result?.data?.createBoard._id}`);
  };

  const onchangeContents = (contents: string): void => {
    setValue("contents", contents);
  };
  return (
    <S.Form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      <S.Wrapper>
        <S.flexWrapper>
          <S.Input placeholder="작성자" {...register("writer")} />
          <S.Input placeholder="비밀번호" {...register("password")} />
        </S.flexWrapper>
        <S.flexWrapper>
          <S.Input
            placeholder="제목"
            style={{ width: "800px" }}
            {...register("title")}
          />
        </S.flexWrapper>
        <S.flexWrapper>
          <ReactQuill theme="snow" onChange={onchangeContents}>
            <div style={{ width: "800px", height: 200 }}></div>
          </ReactQuill>
        </S.flexWrapper>
        <S.flexWrapper>
          <S.submitButton>글등록하기</S.submitButton>
        </S.flexWrapper>
      </S.Wrapper>
    </S.Form>
  );
}
