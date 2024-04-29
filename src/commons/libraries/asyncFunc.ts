// export const wrapAsync = (비동기함수: () => Promise<void>) => (event) => {
//   void 비동기함수();
// };

import type { FormEvent } from "react";

export const wrapAsync = (AsyncFunc: () => Promise<void>) => () => {
  void AsyncFunc();
};

export const wrapFormAsync =
  (AsyncFunc: () => Promise<void>) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void AsyncFunc();
  };
