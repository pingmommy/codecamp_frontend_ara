import React, { useState } from "react";
import { Rate } from "antd";

export default function App(): JSX.Element {
  const [value, setValue] = useState(3);

  // 1단계방식
  // const onChangeStar = (value: number): void => {
  //   setValue(value);
  //   console.log(value);
  // };

  // 2단계방식
  // const onChangeStar = (value) => setValue(value);

  return (
    // <Rate onChange={onChangeStar} value={value} /> // 1단계방식
    // <Rate onChange={onChangeStar} value={value} /> //2단계방식
    // <Rate onChange={(value) => { setValue(value); }} value={value}/> //3단계방식
    <Rate onChange={setValue} value={value} /> // 4단계방식
  );
}
