import axios from "axios";
import { useEffect, useState } from "react";
// 페이지를 열자마자 요청하고 싶어요!!
// 원래는 useQuery를 썼었는데....
/* */

export default function RestGetPage(): JSX.Element {
  const [dog, setDog] = useState("");

  useEffect(() => {
    const onClickSync = async (): Promise<void> => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDog(result.data.message); // 사진주소
    };
    void onClickSync();
  }, []);

  return (
    <div>
      <img src={dog}></img>
    </div>
  );
}
