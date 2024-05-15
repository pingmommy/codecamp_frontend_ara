import JestUnitTestPage from "../../pages/section33/33-03-jest-unit-test-snapshot";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("기존 사진이랑 바뀐 게 없는지 비교해보자!! - 스냅샷 테스트", () => {
  const result = render(<JestUnitTestPage />);

  expect(result.container).toMatchSnapshot();
});

// 코드를 수정하고 스냅샷을 바꾸고 싶으면 yarn test -u

// ui 테스트는 보통 스냅샷 테스트로 이루어지는데,
// ui 테스트는 스토리북을 활용해야 한다.
// chromatic과 스토리북을 같이 활용하자!
