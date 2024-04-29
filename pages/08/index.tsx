export default function ButtonPage(): JSX.Element {
  const onClickButton = (value: number) => (): void => {
    console.log(value);
  };
  return (
    <>
      <button onClick={onClickButton(123)}>버튼</button>
    </>
  );
}
