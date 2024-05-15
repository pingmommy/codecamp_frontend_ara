// import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
// import type {
//   IMutation,
//   IMutationUploadFileArgs,
// } from "../../../src/commons/types/generated/types";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

export default function ImageUploadPage(): JSX.Element {
  const [imgURL, setImgURL] = useState("");

  //   const [uploadFile] = useMutation<
  //     Pick<IMutation, "uploadFile">,
  //     IMutationUploadFileArgs
  //   >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.currentTarget.files?.[0]; // 배열로 들어오는 이유: <input type="file" multiple/>일 때 여러 개 드래그해서 선택할 수도 있기 때문에...
    if (file === undefined) return;
    console.log(file);
    console.log("파일까지 나옴.");

    // const result = await uploadFile({
    //   variables: {
    //     file,
    //   },
    // });
    // console.log(result.data?.uploadFile.url);
    // setImgURL(result.data?.uploadFile.url ?? "");

    // 1. 임시 url 생성 => 가짜 URL - 내가 브라우저에서만 접근 가능 => 다른 컴퓨터에서는 보이지 않아요. 최근 나온 기능이라서 적용이 안되는 브라우저가 있으므로 호환성에 문제가 있을 수 있으므로 2번을 사용하자.
    const result = URL.createObjectURL(file);
    console.log(result);

    // 2. 임시 url 생성 => 진짜 URL - 다른 브라우저에서도 접근 가능 => 이거는 다른 컴퓨터에서도 볼 수 있는 진짜 url인데, 이걸 백엔드에 보내면 안됨. (용량이 너무 커서 비추천.)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string")
        setImgURL(event.target?.result); // 게시판에서 event.target.id를 eslint가 잡았던 이유: event.target은 태그만을 가리키지 않음.
    };
  };
  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      {/* <img src={`https://storage.googleapis.com/${imgURL}`} /> */}
      <img src={imgURL} />
    </>
  );
}

/*

*/
