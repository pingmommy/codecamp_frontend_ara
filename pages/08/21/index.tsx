import { useEffect, useState } from "react";
// import Container from "./container";

export default function Page(): JSX.Element {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((prev) => prev + 1);
  }, []);

  return <>{state}</>;

  // return <>{Container()}</>
}
