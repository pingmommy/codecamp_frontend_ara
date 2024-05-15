// 개발자일때 => 카카오톡 디스코드 슬랙 등
import axios from "axios";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
export default function OpenGraphDeveloperPage(): JSX.Element {
  const onClickEnter = async (): Promise<void> => {
    // 1. 채팅 데이터에 주소가 있는지 찾기(ex, http .... 로 시작하는 것들)

    // 2. 해당 주소로 스크래핑하기
    const result = await axios.get(
      "https://localhost3000/section32/32-01-opengraph-provider"
    ); // CORS :"https://www.naver.com"
    console.log(result.data);

    // 3. 메타태그에서 오픈그래프찾기 (og:...)

    result.data.split("<meta").filter((el: string) => el.includes("og:"));
  };

  return (
    <button onClick={wrapAsync(onClickEnter)}>채팅입력 후 엔터치기!!</button>
  );
}

/*
해당 서버에서 cors를 열어주지 않으면  브라우저에서 다이렉트로 스크래핑을 할 수 없다. 

이럴 땐 백엔드에서 백엔드로 요청하기 - Proxy server

*/

/*
브라우저의 주소창은 restAPI의 get 요청이다. 
그렇기 때문에 브라우저의 주소창에 작성하는 주소를

postman, axios를 통해 요청할 수 있다. 

브라우저, postman, curl, axios 다 비슷한 원리이다. restAPI요청하는 도구이다. 브라우저는 restAPI의 get요청하는 도구이다
차이점이 있다면 
postman은 요청해서 데이터를 가지고 오는 애플리케이션이고, curl은 os에 내장된 데이터를 요청해서 가지고 오는 애플리케이션이고, 
axios는 프로그램 상에서 데이터를 요청할 때 데이터를 가지고 오는 애플리케이션이고 
browser는 요청을 해서 가지고 온 데이터가 html일 때는 화면에 그림을 그려져 보여주는 기능이 내장된 애플리케이션인 것이다.

주소창에다가 주소를 입력하고 엔터를 친다는 것은 해당 html 문서를 다운로드하는 과정이다.  
*/

/*

원래는 프론트엔드 백엔드의 개념이 없고 개발자와 퍼블리셔만 있었다. 

SPA이 나오면서 웹도 모바일만큼 빠르게 움직이게 하자 하다 보니
렌더링 최소화 성능최적화 등 프론트영역이 깊이가 깊어지게 된다. 백엔드도 백엔드 나름 깊이가 깊어지게 된다. 

그래서 요즘 트렌드에서는 
프론트엔드 쪽에서는 엔드포인트에 요청하면 html을,
백엔드에 엔드포인트에 요청하면 json 데이터를 리턴하는 방식으로 역할 분담이 이루어진다.  


우리 프로젝트 안에 있는 pages의 각 폴더는 사실 다 각각의 restAPI 엔드포인트다. 여기로 요청이 오면 html을 리턴한다. 



이를 통해 백엔드든, 프론트엔드든 다 restAPI의 엔드포인트로 이루어져 있구나를 이해하는 게 중요하다.

그렇다면 프론드엔드서버에서도 api를 만들 수 있는데, 엔드포인트로 요청이 들어왔을 때 json을 리턴하면 된다. 
마찬가지로 백엔드에서도 요청이 들어왔을 때 html을 브라우저에 리턴하는 방식으로 화면을 만들 수 있다.

*/
