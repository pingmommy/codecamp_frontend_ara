import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../src/commons/types/generated/types";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: ICreateBoardInput) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  // const [나의함수] = useMutation<결과타입, 변수타입>(나의그래프큐엘셋팅);
  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(나의그래프큐엘셋팅);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (event): void => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event): void => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event): void => {
    setContents(event.target.value);
  };

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "훈이",
          title: "ㅁㄴㅇㄻㄴㅇ",
          contents: contents,
        },
      },
    });
    console.log(result);
  };

  // 한줄일때는 괄호() 필요 없음
  return (
    <div>
      작성자: <input type="text" onChange={onChangeWriter} />
      제목: <input type="text" onChange={onChangeTitle} />
      내용: <input type="text" onChange={onChangeContents} />
      <button onClick={onClickSubmit}>GRAPHQL_API 요청하기</button>
    </div>
  );
}
