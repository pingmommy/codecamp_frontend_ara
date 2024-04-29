import { useRecoilState } from "recoil";
import { isEditState } from "../../../commons/stores";

export default function ExampleWrite(): JSX.Element {
  const [isEdit] = useRecoilState(isEditState);
  return (
    <>
      <h1>{isEdit ? "수정하기" : "등록하기"}</h1>
      작성자 : <input type="text" />
      제 목 : <input type="text" />
    </>
  );
}
