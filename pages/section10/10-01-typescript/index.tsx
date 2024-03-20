export default function TypeScriptPage() {
  //타입추론 : 처음에 들어간 값을 가지고 어떤 타입인지 추론한다.
  let aaa = "안녕";

  //타입명시
  let bbb: string = "반가워";

  // 타입명시가 필요한 상황
  let ccc: number | string = 1000;
  ccc = "1000원";

  //숫자타입
  let ddd: number = 10;

  //불린타입
  let eee: boolean = true;
  eee = false;
  //eee="false" // 빈문자열이 아니라서 true

  //배열타입
  //let fff: number[] = [1, 2, 3, 4, 5, "hi"];
  //let ggg: string[] = ["철수", "영희", 1];
  let hhh: (string | number)[] = ["철수", "영희", 12, 3, 4]; // 타입추론을 활용하여 어떤 타입을 사용하는지 알아보기

  //객체타입
  interface IProfile {
    name: string;
    age: number | string;
    school: string;
    hobby?: string; //?의 의미: 프로퍼티가 있어도 되고 없어도 되고. ? 없으면 프로퍼티없으면 에러남.
  }

  const profile: IProfile = {
    name: "철수",
    age: 10,
    school: "다람쥐초등학교",
  };

  profile.name = "영희"; //타입추론으로 이것만 가능
  profile.age = "eight";
  profile.hobby = "수영";

  // 함수타입
  function add(num1: number, num2: number, unit: string): string {
    return num1 + num2 + unit;
  }

  const result = add(1000, 2000, "원"); //결과의 리턴타입도 에측 가능!!

  const add2 = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };

  const result2 = add(1000, 2000, "원");

  //any타입 (가급적 자제) - 자바스크립트와 동일
  let qqq: any = "철수";
  qqq = 123;
  qqq = true;

  return <></>;
}
