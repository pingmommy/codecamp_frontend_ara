export default function ImagePreloadMovedPage(): JSX.Element {
  return (
    <>
      <img src="dog.png" />
      {/* 내가 이걸 다운받은 적이 있었나 브라우저가 메모리를 다 뒤져본다. 있네? 그럼 새롭게 다운로드하지 않는다. 그래서 그림이 굉장히 빨리 보인다. */}
    </>
  );
}
