import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function kakaoMapPage(): JSX.Element {
  useEffect(() => {
    const script = document.createElement("script"); //
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=48c6bca280bb2a2f8871dd9e666b3168";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스

        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options);
        console.log(map);
      });
    };
  }, []);

  return (
    <>
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=48c6bca280bb2a2f8871dd9e666b3168"
      ></script> */}

      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
