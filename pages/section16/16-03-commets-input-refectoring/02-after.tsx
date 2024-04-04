import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      writer: event.currentTarget.value,
      title: inputs.title,
      contents: inputs.contents,
    });
  };

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수({
      variables: {
        ...inputs,
      },
    });
    console.log(result);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      ...inputs,
      title: event.currentTarget.value,
    });
  };

  const onChangeInPut = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      ...inputs,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  return (
    <div>
      작성자: <input type="text" id="writer" onChange={onChangeWriter} />
      제목: <input type="text" id="title" onChange={onChangeTitle} />
      내용: <input type="text" id="contents" onChange={onChangeInPut} />
      <button onClick={onClickSubmit}>GRAPHQL_API 요청하기</button>
    </div>
  );
}
