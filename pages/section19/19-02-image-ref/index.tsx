import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const imgRef = useRef<HTMLInputElement>(null);

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

    const result = await uploadFile({
      variables: {
        file,
      },
    });
    console.log(result.data?.uploadFile.url);
    setImgURL(result.data?.uploadFile.url ?? "");
  };

  const handleFile = (): void => {
    imgRef.current?.click();
  };
  return (
    <>
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "lightgrey" }}
        onClick={handleFile}
      >
        +
      </div>
      <input type="file" onChange={onChangeFile} ref={imgRef} />

      <img src={`https://storage.googleapis.com/${imgURL}`} />
    </>
  );
}
