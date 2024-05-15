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
  const [imgURLs, setImgURLs] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile

    // 1-1. 안 좋은 예제-  await를 매번 기다림 => for문 사용해도 마찬가지 (이유: i 값에 의존하기 때문에..)
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    // const url0 = resultFile0.data?.uploadFile.url;
    // const url1 = resultFile1.data?.uploadFile.url;
    // const url2 = resultFile2.data?.uploadFile.url;
    // const resultUrls =[url0,url1,url2]

    // 1-2.좋은 예제 - Promise.all 사용
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);
    // console.log(results); // [resultFile0,resultFile1,resultFile2, ]

    // const resultUrls = results.map((el) => el.data?.uploadFile.url); // resultUrls =[url0,url1,url2]

    // 1-3. 좋은 예제 Promise.all 사용 => 리펙토링
    // const files = []
    // files.map(el=> uploadFile({ variables: { file: el } }))

    const results = await Promise.all(
      files.map(async (el) => await uploadFile({ variables: { file: el } })) // [resultFile0,resultFile1,resultFile2, ]
    ); // for문처럼 map 또한 순회하지만  i에 의존하여 하나의 프로미스가 끝나야 다음 프로미스가 가능했던 for문과 달리 map은 개별적으로 작동한다.

    console.log(results);
    const resultUrls = results.map((el) => el.data?.uploadFile.url); // resultUrls =[url0,url1,url2]
    // 2. createBoard
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "제목이라구요.",
          contents: "내용이라구요!",
          images: resultUrls,
        },
      },
    });
    console.log(result);
  };

  const onChangeFile =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.currentTarget.files?.[0]; // 배열로 들어오는 이유: <input type="file" multiple/>일 때 여러 개 드래그해서 선택할 수도 있기 때문에...
      if (file === undefined) return;
      console.log(file);
      console.log("파일까지 나옴.");

      // 1. 임시 url 생성 => 가짜 URL - 내가 브라우저에서만 접근 가능 => 다른 컴퓨터에서는 보이지 않아요. 최근 나온 기능이라서 적용이 안되는 브라우저가 있으므로 호환성에 문제가 있을 수 있으므로 2번을 사용하자.
      const result = URL.createObjectURL(file);
      console.log(result);

      // 2. 임시 url 생성 => 진짜 URL - 다른 브라우저에서도 접근 가능 => 이거는 다른 컴퓨터에서도 볼 수 있는 진짜 url인데, 이걸 백엔드에 보내면 안됨. (용량이 너무 커서 비추천.)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const tempUrls = [...imgURLs];
          tempUrls[index] = event.target?.result;
          setImgURLs(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };
  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile(0))} />
      <input type="file" onChange={wrapAsync(onChangeFile(1))} />
      <input type="file" onChange={wrapAsync(onChangeFile(2))} />
      {/* <img src={`https://storage.googleapis.com/${imgURL}`} /> */}
      <img src={imgURLs[0]} />
      <img src={imgURLs[1]} />
      <img src={imgURLs[2]} />
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}

/*
이전에는 이미지를 하나만 업로드하는 실습을 했는데, 만약 이미지를 여러개 업로드한다면??? =>이 때 promise.all을 사용하자!
*/
