export default function CheckBox() {
  // 파일을 분리해도 이벤트 버블링 발생함.
  //원하지 않으면 event.stopPropagation()로 이벤트버블링방지하기
  const qqq2 = (event: any) => {
    event.stopPropagation();
    alert("2번클릭");
  };

  const qqq3 = (event: any) => {
    event.stopPropagation();
    alert("3번클릭");
  };

  return (
    <span onClick={qqq2}>
      <input type="checkbox" onClick={qqq3} />
    </span>
  );
}
