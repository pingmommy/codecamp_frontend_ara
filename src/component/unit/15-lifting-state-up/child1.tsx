/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function Child1(props: any): JSX.Element {
  function onClickCountUp(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    props.setCount((prev: number) => prev + 1);
  }

  return (
    <div>
      <div>자식1의 카운트{props.count}</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
    </div>
  );
}
