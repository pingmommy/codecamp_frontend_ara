/* ts와 tsx를 잘 구분해서 써야 한다. tsx파일을 테스트할 껀데 
테스트파일은  ts파일로 만들면 안된다. 
하나만 테스트할 때는 it,
실무에서는 주로 여러 개를 테스트하는 describe

테스트는 완벽할 수가 없다. 내가 어느 정도까지 테스트할 지 정하는 것이다. 
여기서 발생하는 문제는 테스트를 완벽하게 할 것인가?
이러면 기능 하나 만들고 테스트 하는데 너무 많은 시간이 걸린다. 
보통은 기능을 만들고 핵심내용만 테스트한다. 
그 이후에 테스트 버그가 발생하면 그 버그에 대한 테스트를 추가적으로 하는 것이다. 
*/

import JestUnitTestPage from "../../pages/section33/33-02-jest-unit-test";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("내가 원하는 대로 그려지는 테스트하기", () => {
  render(<JestUnitTestPage />);
  const myText = screen.getByText("철수는 13살입니다.");
  expect(myText).toBeInTheDocument();

  const myText2 = screen.getByText("철수의 취미 입력하기:");
  expect(myText2).toBeInTheDocument();

  const myText3 = screen.getByText("철수랑 놀러가기");
  expect(myText3).toBeInTheDocument();
});
