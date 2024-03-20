//인기검색어목록 실습
// 컴포넌트 위에 만든 이유: 컴포넌트가 리렌더링 되어도 다시 안 만들어짐 -- 효율적
const fruits = [
  { number: 1, title: "레드향" },
  { number: 2, title: "샤인머스켓" },
  { number: 3, title: "산청딸기" },
  { number: 4, title: "한라봉" },
  { number: 5, title: "사과" },
  { number: 6, title: "애플망고" },
  { number: 7, title: "딸기" },
  { number: 8, title: "천혜향" },
  { number: 9, title: "과일선물세트" },
  { number: 10, title: "귤" },
];
export default function MapFruitsPage() {
  //1. 가장기본예제
  const aaa = [<div>1.레드향</div>, <div>2.딸기</div>];

  //2.실무 백엔드데이터 예제
  const bbb = fruits.map((el) => (
    <div>
      {el.number}
      {el.title}
    </div>
  ));
  return (
    <div>
      <div>{aaa}</div>
      =================
      <div>{bbb}</div>
      =================
      <div>{/*3. 실무 효율적인 렌더링 예제*/}</div>
      <div>
        {fruits.map((el) => (
          <div>
            {el.number}
            {el.title}
          </div>
        ))}
      </div>
    </div>
  );
}
