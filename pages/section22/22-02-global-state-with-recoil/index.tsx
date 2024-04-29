import { useEffect } from "react";
import BoardWrite from "../../../src/component/unit/22-global-state/boardWrite.container";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/stores";
export default function GlobalStateWithRecoil(): JSX.Element {
  // const [isEdit, setIsEdit]=useState(true);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return <BoardWrite />;
}
