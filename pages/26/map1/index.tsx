import { useEffect } from "react";

declare const window: typeof globalThis & { kakao: any };

export default function MapPage(): JSX.Element {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=53c5999eab1f06d666f0a3483f075294";

    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.601034, 126.651014),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const imageSrc = "/images/mapMarker.png";
        const imageSize = new window.kakao.maps.Size(34, 39);
        const imageOption = {
          offset: new window.kakao.maps.Point(17, 29),
        };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
          image: markerImage,
        });

        marker.setMap(map);
        window.kakao.maps.event.addListener(map, "click", (e) => {
          const latlng = e.latLng;
          marker.setPosition(latlng);
        });
      });
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}

/*
에러가 난다. 
왜? 이동이 너무 빨라서 
왜? 파일을 다운로드하기 전에 이동함. 
그럼? 느리게 이동하게 해야 함. 
어떻게? 온로드로. 

*/
