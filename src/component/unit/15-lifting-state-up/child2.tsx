/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function Child2(props: any): JSX.Element {
  return (
    <div>
      <div>자식2의 카운트{props.count}</div>
      <button onClick={props.onClickCount}>카운트올리기</button>
    </div>
  );
}
