import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";
import { checkValidationFile } from "../../../src/commons/libraries/validation";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [imgURL, setImgURL] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.currentTarget.files?.[0]; // 배열로 들어오는 이유: <input type="file" multiple/>일 때 여러 개 드래그 가능
    console.log(file);

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({
      variables: {
        file,
      },
    });
    console.log(result.data?.uploadFile.url);
    setImgURL(result.data?.uploadFile.url ?? "");
  };

  // /////////////////////////////////////////////////////////////////////

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>): void => {
    setContents(event.target.value);
  };

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer,
          password: "1234",
          title,
          contents,
          images: [imgURL],
        },
      },
    });
    console.log(result);
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} />
      제목: <input type="text" onChange={onChangeTitle} />
      내용: <input type="text" onChange={onChangeContents} />
      <input
        type="file"
        onChange={onChangeFile}
        accept="image/jpeg,image/png"
      />
      <img src={`https://storage.googleapis.com/${imgURL}`} />
      <button onClick={onClickSubmit}>GRAPHQL_API 요청하기</button>
    </>
  );
}
