import axios from "axios";

export default function RestGetPage() {
  //   //비동기
  //   function onClickAsync() {
  //     const result = axios.get("https://koreanjson.com/posts/11");
  //     console.log(result); //Promise
  //   }

  //   //동기
  //   async function onClickSync() {
  //     const result = await axios.get("https://koreanjson.com/posts/11");
  //     console.log(result);
  //   }

  //비동기
  const onClickAsync = () => {
    const result = axios.get("https://koreanjson.com/posts/11");
    console.log(result); //Promise
  };

  //동기
  const onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/11");
    console.log(result);
  };

  return (
    <div>
      <button onClick={onClickAsync}>REST_API(비동기)</button>
      <button onClick={onClickSync}>REST_API(동기)</button>
    </div>
  );
}
