import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseapp } from "../../../src/commons/libraries/firebase";

export default function FirebasePage(): JSX.Element {
  const onClickSubmit = (): void => {
    const board = collection(getFirestore(firebaseapp), "board");

    void addDoc(board, {
      writer: "jade",
      title: "hi everyone!",
      contents: "nice to meet you",
    });
  };
  const onClickFetch = async (): Promise<void> => {
    const board = collection(getFirestore(firebaseapp), "board");

    const result = await getDocs(board);

    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
