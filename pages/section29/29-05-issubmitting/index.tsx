import axios from "axios";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
import { useState } from "react";

export default function RestGetPage(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  게시글 등록하기 버튼이라고 가정
  const onClickSync = async (): Promise<void> => {
    setIsSubmitting(true);
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    //  ////////////////////////////////////////////////// await를 만나면서  한 텀 끝나서 리렌더링됨.
    setIsSubmitting(false);
  };

  return (
    <button onClick={wrapAsync(onClickSync)} disabled={isSubmitting}>
      REST_API(동기)
    </button>
  );
}
