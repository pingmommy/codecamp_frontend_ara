import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";

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
  const [file, setFile] = useState<File>();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile을 통해서 이미지를 클라우드에 저장해주시고 다운로드url을 받아온 다음 createBoard를 실행.
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data?.uploadFile.url;
    // 2. createBoard
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "제목이라구요.",
          contents: "내용이라구요!",
          images: [url],
        },
      },
    });
    console.log(result);
  };

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
      if (typeof event.target?.result === "string") {
        setImgURL(event.target?.result); // 게시판에서 event.target.id를 eslint가 잡았던 이유: event.target은 태그만을 가리키지 않음.
        setFile(file);
      }
    };
  };
  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      {/* <img src={`https://storage.googleapis.com/${imgURL}`} /> */}
      <img src={imgURL} />
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}

/*
네트워크 탭을 보면 2번 요청 
uploadFile, createBoard
*/

/*
이미지 업로드 개선하기

1.미리보기 성능 개선하기

2. 업로드 성능 개선하기

지난 이미지 업로드가 비효율적인 2가지
- 미리보기가 너무 느리다. (파일을 백엔드에 보내고 백엔드에서 클라우드에 보내고
사진스토리지 주소를 받아서 그걸 또 스토리지에서 받아오고....)

----> 임시 url (FileReader >> 자바스크립트에 내장되어 있음.)

- 스토리지까지 갔었는데... 사용자가 등록을 안하고  뒤로가기 하거나 
취소하면 사용되지 않는 이미지는 스토리지에 계속 남아 있다.=>이미지 찌꺼기

----> 임시url 덕분에 이미지찌꺼기 안생김. 


===> 등록하기를 누르면 그 때 uploadFile api가 날라가고 그 때 클라우드에 
사진파일이 업로드되고, 스토리지에서 사진다운로드주소를 받아가지고 와서 
그걸 createBoard에 넘긴다. 

-------> 임시url로 비효율 2가지를 해결했지만 등록하기는 시간이 좀 걸릴 수 있다.

*/
