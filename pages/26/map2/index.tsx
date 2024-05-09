import { useRouter } from "next/router";

export default function MapPage(): JSX.Element {
  const router = useRouter();
  const onclickMoveToPage = (): void => {
    void router.push("/26/map1");
  };

  return (
    <>
      <button onClick={onclickMoveToPage}>페이지 이동하기</button>
    </>
  );
}
