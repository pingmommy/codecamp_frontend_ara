// 1. 함수를 리턴하는 함수
function aaa() {
  const apple = 10;
  return function abb() {
    const banana = 20;
    console.log(banana);
    console.log(apple);
  };
}
aaa()();
//
//
// 2. 함수를 리턴하는 함수 - 인자를 받음.
function aab(apple) {
  return function (banana) {
    console.log(banana);
    console.log(apple);
  };
}
aab(100)(200);

// 3. 함수를 리턴하는 함수 - 화살표함수
// 화살표 함수에서 중괄호와 리턴 사이에 아무것도 없으면 소괄호()로 변경할 수 있고
// 특이한 점이 없으면 소괄호는 생략도 가능하다.
const bbb = (apple) => (banana) => {
  console.log(banana);
  console.log(apple);
};

bbb(20)(30);

// 4. 함수를 리턴하는 함수  - 인자 여러 개

const ccc = (apple) => (banana) => (tomato) => (orange) => {
  console.log(banana);
  console.log(apple);
  console.log(tomato);
  console.log(orange);
};

ccc(10)(20)(30)(40);

// HOF - Higher Order Function
// 더 높은 곳에 위치한 함수 예시에서 aaa()같은 ...  근데 리액트에서 어디 쓰는가??
