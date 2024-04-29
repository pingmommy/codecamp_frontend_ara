import { useEffect } from "react";
import ExampleWrite from "../../../../src/component/unit/example/write";
import { isEditState } from "../../../../src/commons/stores";
import { useRecoilState } from "recoil";

export default function EditPage(): JSX.Element {
  const [, setIsEdit] = useRecoilState(isEditState);
  useEffect(() => {
    setIsEdit(true);
  }, []);

  return (
    <>
      <ExampleWrite />
    </>
  );
}
