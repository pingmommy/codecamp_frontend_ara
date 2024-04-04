export interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

//1 partial 타입

type aaa = Partial<IProfile>;

//2 Required타입

type bbb = Required<IProfile>;

//3. Pick 타입

type ccc = Pick<IProfile, "name" | "age">;

//4.Omit 타입

type ddd = Omit<IProfile, "school">;

//5. Record 타입

type eee = "철수" | "영희" | "훈이"; // union타입

let child1: eee = "철수"; // 유니온타입으로 선언된 철수 영희 훈이만 할당할 수 있음.

let child2: string = "사과"; // 문자는 모든 다 됨.

type fff = Record<eee, IProfile>; //유니온타입이 키로, 키에 대한 밸류로 객체 할당

type ggg = keyof IProfile; //keyof  - "name" "age" "school" "hobby"

//6.객체의 key들로 union타입 만들기
let myProfile: ggg = "hobby";

//7.type vs Interface 차이 => interface만 선언병합

export interface IProfile {
  candy: number;
}

//8. 배운 거 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
