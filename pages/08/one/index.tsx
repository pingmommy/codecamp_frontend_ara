import axios from "axios";
import { useEffect, useState } from "react";

export default function OnePage(): JSX.Element {
  const [img, setImg] = useState<string[]>([]);
  // const [img, setImg] = useState();

  // const getImg = async (): Promise<void> => {
  //   new Array(9).fill(1).forEach(async (_) => {
  //     const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  //     setImg((prev) => [...prev, result.data.message]);
  //   });
  // };

  // void getImg();

  useEffect(() => {
    const getImg = async (): Promise<void> => {
      new Array(9).fill(1).forEach(async (_) => {
        const result = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setImg((prev) => [...prev, result.data.message]);
      });
    };

    void getImg();
  }, []);

  // const getImg = async (): Promise<void> => {
  //   new Array(9).fill(1).forEach(async (_) => {
  //     const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  //     setImg(result.data.message);
  //   });
  // };
  return (
    <>
      {img.map((el) => (
        <>
          <img
            key={el}
            style={{ width: "300px", height: "300px", cursor: "pointer" }}
            src={el}
          ></img>
        </>
      ))}
      {/* <img
        style={{ width: "300px", height: "300px", cursor: "pointer" }}
        src={img}
      ></img> */}
    </>
  );
}
