// import { Observable } from "@apollo/client"; // zen-observable에서 가져와서 apollo/client가 변형하여 쓰는 것이다. zen-observable보다 더 유명한 것은 rxjs이다.
import { from } from "zen-observable";

export default function ObservableFlatmapPage(): JSX.Element {
  const onClickButton = (): void => {
    //  new Promise((resolve,reject)=>{})
    //  new Observable((observer)=>{})

    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"])
      // 스트링을 옵져버블로 만들기 위해서 from 을 사용한 것이고, 만약 인자로 promise가 들어가면 fromPromise가 되어야 함.
      // 하나가 아니라 연속적이다. 연속적인 쿼리에 반응하는 프로그래밍이므로 반응형 프로그래밍이라고 한다.

      .flatMap((el) =>
        from([`${el} 결과에 qqq(특정로직)에 적용`, `${el} 결과에 zzz 적용`])
      )
      .subscribe((el) => {
        console.log(el);
      });
  };
  return <button onClick={onClickButton}>CLICK</button>;
}

// 프로미스를 옵저버블로 변경해주는 것 fromPromise

// from은 옵져버블을 만들어주는 것.
