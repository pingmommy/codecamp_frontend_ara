export default function CounterLetPage() {
  function onClickCountUp() {
    const count = Number(document.getElementById("qqq").textContent) + 1;

    document.getElementById("qqq").textContent = count;
  }

  function onClickCountDown() {
    const count = Number(document.getElementById("qqq").textContent) - 1;

    document.getElementById("qqq").textContent = count;
  }
  return (
    <div>
      <div id="qqq">0</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
      <button onClick={onClickCountDown}>카운트내리기</button>
    </div>
  );
}
