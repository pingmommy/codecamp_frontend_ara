/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { MouseEvent } from "react";

export default function CommentItem(props: any): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>): void => {
    setIsEdit(true);
  };
  return (
    <div>
      {!isEdit ? (
        <div>
          <span style={{ margin: "10px" }}>{props.el.writer}</span>
          <span style={{ margin: "10px" }}>{props.el.title}</span>
          <button onClick={onClickEdit}>edit</button>
        </div>
      ) : (
        <input type="text" />
      )}
    </div>
  );
}
