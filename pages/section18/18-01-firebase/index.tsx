export default function FirebasePage(): JSX.Element {
  const onClickSubmit = (): void => {};
  const onClickFetch = (): void => {};

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
