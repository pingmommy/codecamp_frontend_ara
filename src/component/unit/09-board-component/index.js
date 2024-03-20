export default function BoardComponent(props) {
  return (
    <>
      <h1>{props.isEdit ? "등록" : "수정"}페이지</h1>
      제목:
      <input />
      내용:
      <input />
      <button>{props.isEdit ? "등록" : "수정"}하기</button>
    </>
  );
}
