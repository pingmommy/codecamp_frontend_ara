//BoardWrite
import { useMutation } from "@apollo/client";
import { useState, ChangeEvent } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";

interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
}

export default function BoardWrite(props: IBoardWriteProps) {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    router.push(
      `/section10/10-02-typescript-boards/${result.data.createBoard.number}`,
    );
  };

  const onClickUpdate = async () => {
    interface IMyVariables {
      number: number;
      writer?: string;
      title?: string;
      contents?: string;
    }

    const myVariables: IMyVariables = { number: Number(router.query.number) };
    if (writer) {
      myVariables.writer = writer;
    }
    if (title) {
      myVariables.title = title;
    }
    if (contents) {
      myVariables.contents = contents;
    }
    const result = await updateBoard({
      variables: myVariables,
    });
    router.push(
      `/section10/10-02-typescript-boards/${result.data.updateBoard.number}`,
    );
  };

  return (
    <BoardWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      data={props.data}
    />
  );
}
