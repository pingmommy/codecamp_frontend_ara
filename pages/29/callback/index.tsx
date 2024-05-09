/* eslint-disable @typescript-eslint/promise-function-async */
import axios from "axios";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
import { useState } from "react";

export default function CallbackPage(): JSX.Element {
  const [posts, setPosts] = useState<any>();
  const onClickCallback = (): void => {
    const qq = new XMLHttpRequest();
    qq.open("get", "http://numbersapi.com/random?min=1&max=200");
    qq.send();
    qq.addEventListener("load", (res: any) => {
      const num = res.target.response.split(" ")[0];

      const bb = new XMLHttpRequest();
      bb.open("get", `https://koreanjson.com/posts/${num}`);
      bb.send();
      bb.addEventListener("load", (res: any) => {
        const UserId = JSON.parse(res.target.response).UserId;

        const cc = new XMLHttpRequest();
        cc.open("get", `https://koreanjson.com/posts?userId=${UserId}`);
        cc.send();
        cc.addEventListener("load", (res: any) => {
          setPosts(JSON.parse(res.target.response));
        });
      });
    });
  };

  const onClickPromise = (): void => {
    void axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        const num = res.data.split(" ")[0];
        return axios.get(`https://koreanjson.com/posts/${num}`);
      })
      .then((res) => {
        return axios.get(
          `https://koreanjson.com/posts?userId=${res.data.UserId}`
        );
      })
      .then((res) => {
        setPosts(res.data);
      });
  };

  const onClickAsyncAwait = async (): Promise<void> => {
    const result = await axios.get(
      "http://numbersapi.com/random?min=1&max=200"
    );
    const num = result.data.split(" ")[0];
    const result2 = await axios.get(`https://koreanjson.com/posts/${num}`);
    const result3 = await axios.get(
      `https://koreanjson.com/posts?userId=${result2.data.UserId}`
    );
    setPosts(result3.data);
  };

  return (
    <>
      결과: <button onClick={onClickCallback}>Callback</button>
      결과: <button onClick={onClickPromise}>Promise</button>
      결과: <button onClick={wrapAsync(onClickAsyncAwait)}>Async/Await</button>
      <button
        onClick={() => {
          console.log(posts);
        }}
      >
        dd
      </button>
      {posts.map((el) => (
        <div key={el.id}>
          내 용 : <div>{el.content}</div>
          <br />
        </div>
      ))}
    </>
  );
}
