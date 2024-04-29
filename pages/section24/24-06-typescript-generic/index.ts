// 1. 문자/숫자/불린 타입(primitive type)

const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

// 2. any타입 => 그냥 자바스크립트랑 같음

const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", "123", true);

// 3. unknown타입

const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 * 1000);
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", "123", true);

// 4. generic타입

function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric<string, string, number>("철수", "123", 123);

/* 제네릭은 any처럼 어떤 타입이든 넣을 수 있다. 
   하지만 한번 값을 넣으면 넣은 값의 타입으로 고정된다. 


  */

// 4. generic타입

function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result = getGeneric2<string, string, number>("철수", "123", 123);

// 4. generic타입

function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result = getGeneric3<string, string, number>("철수", "123", 123);

// 4. generic타입

const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result = getGeneric4<string, string, number>("철수", "123", 123);
