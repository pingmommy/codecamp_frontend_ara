import type { AppProps } from "next/app";
import ApolloSetting from "../src/component/commons/apollo";
import Layout2 from "../src/component/commons/layout2";
import { Global } from "@emotion/react";
import { GlobalStyles2 } from "../src/commons/styles/globalStyles2";
export default function App({ Component }: AppProps): JSX.Element {
  return (
    <ApolloSetting>
      <>
        <Global styles={GlobalStyles2} />
        <Layout2>
          <Component />
        </Layout2>
      </>
    </ApolloSetting>
  );
}
