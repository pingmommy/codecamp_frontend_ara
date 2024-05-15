// export const wrapAsync = (비동기함수: () => Promise<void>) => (event) => {
//   void 비동기함수();
// };

import type { ChangeEvent, FormEvent } from "react";

/* 
첫번 째 인자로 들어오는 비동기함수에서 event.target 등을 사용하고 있어서 비동기함수에서 인자로 event를 받고 있으면,
  wrapAsync()의 두번 째 인자로 들어오는 부분에 생략이 가능했던 event를 명시해주어야 한다.
  이 때 타입 HTML타입이나 이벤트타입도 명시해주어야 하는데, 모든 이벤트와 태그들을 다 함수로 만들 수는 없다.  
  그래서 함수를 사용할 때 입력하는 것에 따라 타입이 정해지는 제네릭타입을 사용하여 함수를 고쳤다.  
*/
export const wrapAsync_A =
  (AsyncFunc: (event: ChangeEvent<HTMLInputElement>) => Promise<void>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    void AsyncFunc(event);
  };

/*
export const wrapAsync_A =
  (AsyncFunc: (event: ChangeEvent<HTMLInputElement>) => Promise<void>) 
  
  >> 이것은 wrapAsync의 인자로 들어오는 비동기함수의 타입이다. 아래 onChangeFile()가 AsyncFunc 자리에 온 것인데, onChangeFile()가 event.target...을 쓰고 있어서
  onChangeFile(event)처럼 비동기함수의 인자로 event가 들어와서  
  
  =>(event: ChangeEvent<HTMLInputElement>) => {

    >> event를 생략했던 부분에 위처럼 명시를 해야 했다. 

    void AsyncFunc(event);
  };

   const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => { ... }


  근데 타입을 특정하면 타입마다 다 만들어주어야 하기 때문에 사용할 때 들어온 타입으로 사용할 때마다 타입을 특정하는 제네릭을 써서 작성하면 효율적이다.
  아래의 코드가 그 예이다.
*/

export const wrapAsync =
  <E>(AsyncFunc: (event: E) => Promise<void>) =>
  (event: E) => {
    void AsyncFunc(event);
  };

export const wrapFormAsync =
  (AsyncFunc: () => Promise<void>) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void AsyncFunc();
  };
// form의 기본적인 동작을 막기 위해 event.preventDefault() 메서드를 쓰려다 보니
// (event: FormEvent<HTMLFormElement>) 를 작성하게 됨.
