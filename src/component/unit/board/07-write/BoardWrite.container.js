//BoardWrite
import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { 나의그래프큐엘셋팅 } from "./BoardWrite.queries";

export default function BoardWrite() {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [isActive, setIsActive] = useState();

  const onChangeWriter = (event) => {
    setWriter(event.target.value);

    if (event.target.value && title && contents) {
      setIsActive(true);
    }
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);

    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };
  const onChangeContents = (event) => {
    setContents(event.target.value);

    if (writer && title && event.target.value) {
      setIsActive(true);
    }
  };

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };

  return (
    <BoardWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      isActive={isActive}
    />
  );
}
