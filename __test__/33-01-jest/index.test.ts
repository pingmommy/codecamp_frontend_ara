import { add } from "../../pages/section33/33-01-jest";

it("더하기 잘 되는지 테스트하기", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// describe("나만의 테스트그룹 만들기",()=>{
//     it("더하기테스트",()=>{

//     })

//     it("빼기기테스트",()=>{

//     })
// })

/*
Next에서는 테스트폴더를 pages와 형제관계로 폴더구조를 만든다. 
jest가 test나 spec가 포함된 파일을 찾아서 테스트 한다. 
*/
