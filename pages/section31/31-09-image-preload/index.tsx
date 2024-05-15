import { useRouter } from "next/router";
import { useEffect } from "react";

const qqq = []; // 함수 바디가 아닌 전역에 변수로 선언했기 때문에 어떤 페이지가 우리 눈에 보이더라도 이 변수는 살아있다. (리렌더해도 초기화 안됨)

export default function ImagePreloadPage(): JSX.Element {
  const router = useRouter();

  // 화면이 다 그려지고 뒤에서 모르게 다운로드하고 있다.
  useEffect(() => {
    const img = new Image(); // 태그를 새로 만든 것이다.
    img.src = "dog.png";

    img.onload = () => {
      qqq.push(img);
    };
  }, []);
  const onClickMove = (): void => {
    void router.push("/section31/31-09-preload-moved");
  };
  return (
    <>
      <button onClick={onClickMove}>페이지이동하기</button>
    </>
  );
}
/*


이미지 프리로드 

메모리에 저장해놓는다 - 캐싱 - 쉽게 말해 전역변수에 넣어 놓는 것이다. 
- 언제든지 꺼내 쓸 수 있다. 

다음 페이지에 쓸 이미지를 미리 다운로드해놓고 다음 페이지로 넘어갔을 때
부드럽게 바로 보여주는 것이 이미지 프리로드 

메모리에 캐싱하지 않으면 페이지를 이동할 때 해당 페이지에 필요한 이미지를 다운로드하기 때문에 
이미지가 좀 크면 매우 느리다. 

모든 이미지를 다 캐싱해놓으면 그것도 문제다. 
전역의 메모리에 계속 남기 때문에 메모리누수문제가 일어난다.

다음 페이지에서 보여질 배너이미지인데, 이건 무조건 사람들이 다음페이지로 넘어갈 수 밖에 없다. 
이런 때에 이미지 프리로드를 해놓으면 효율적인 사이트를 만들 수 있다.
*/
