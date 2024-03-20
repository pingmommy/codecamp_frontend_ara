import { gql, useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import CheckBox from "./checkbox";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  const qqq1 = () => {
    alert("1번클릭");
  };

  // const qqq2 = () => {
  //   alert("2번클릭");
  // };

  // const qqq3 = () => {
  //   alert("3번클릭");
  // };

  //event.stopPropagation();이벤트버블링 막기
  const qqq4 = (event: any) => {
    event.stopPropagation();
    alert("4번클릭");
  };
  return (
    <div>
      {data?.fetchBoards.map((el: any) => (
        <div id={el.writer} onClick={qqq1}>
          {/* <span onClick={qqq2}>
            <input type="checkbox" onClick={qqq3} />
          </span> */}
          <CheckBox />
          <span style={{ margin: "10px" }} onClick={qqq4}>
            {el.number}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
        </div>
      ))}
    </div>
  );
}
