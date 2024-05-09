import Link from "next/link";
import { useRouter } from "next/router";

export default function kakaoMapPage(): JSX.Element {
  const router = useRouter();
  const onclickMove = (): void => {
    void router.push("/section25/25-02-kakao-map-routing-moved");
  };
  return (
    <>
      {/* 이동을 하면 에러가 나는데, 이유는 spa 방식이라 이동이 빠르기 때문에, 
카카오 api파일을 다운로드 하기 전에 이미 이동을 해서 그렇다.  */}
      <button onClick={onclickMove}>페이지 이동</button>

      {/* <a>는 매 페이지를 새로 다운로드 받으므로 위의 에러는 발생하지 않지만 SPA 활용 못함 */}
      <a href="/section25/25-02-kakao-map-routing-moved">페이지 이동하기!</a>

      {/* next에서 제공하는 <a>태그 이므로 SPA 활용가능 + <a>를 써서 검색 좋아짐(시멘틱태그) */}
      <Link href="/section25/25-02-kakao-map-routing-moved">
        <a>페이지 이동하기</a>
      </Link>

      {/*  의미가 있는 시멘틱 태그의 장점 */}
      <h1>요리</h1>
      <div>요리</div>
      <section>요리</section>
    </>
  );
}

/*
이동을 하면 에러가 나는데, 이유는 spa 방식이라 이동이 빠르기 때문에, 
카카오 api파일을 다운로드 하기 전에 이미 이동을 해서 그렇다. 
이동속도를 좀 늦추거나, app.tsx에서 다운로드를 실행하면 되지만, 
이 파일이 필요한 곳은 많지 않으므로 후자는 추천하지 않는다. 
*/

/*
<a>는 spa를 활용하지 못하기 때문에 next,react에서는 사용을 지양한다. 

<Link> - next 전용 <a>태그 
next에서는 페이지를 이동할 때는 <Link>, router.push()를 사용한다. 

게시글 등록, 수정, 삭제 후 자동으로 페이지가 이동되어야 할 때는 router.push()
버튼을 눌러서 페이지를 이동시킬 때는 <Link> 를 쓴다. 

기능은 같은데,  router.push()보다는 <Link>를 적극적으로 사용해야 하는 이유:

docs에 보면 <Link><a></a><Link>를 쓰라고 하는데, 
이 때 <a>는 본연의 기능과는 전혀 다르게 기능한다.(페이지를 이동하긴 하지만 새롭게 다운로드하여 이동하는 게 아닌 react방식에 종속됨.)

위와 같이 사용하면 <a>로 브러우저가 인식하는데, 이게 검색엔진에 노출이 잘 된다. (시멘틱태그)

router.push()는 검색엔진에 노출이 안 됨. 

시멘틱태그를 잘 사용하려면 무조건 div보다는 기능에 맞는 다양한 태그를 사용하는 게 좋다. 
*/
