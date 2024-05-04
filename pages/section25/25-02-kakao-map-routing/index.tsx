import Link from "next/link";
import { useRouter } from "next/router";

export default function kakaoMapPage(): JSX.Element {
  const router = useRouter();
  const onclickMove = (): void => {
    void router.push("/section25/25-02-kakao-map-routing-moved");
  };
  return (
    <>
      <button onClick={onclickMove}>페이지 이동</button>

      {/* <a>는 매 페이지를 새로 다운로드 받으므로 SPA 활용 못함 */}
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
