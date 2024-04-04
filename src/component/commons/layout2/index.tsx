import Banner from "./banner";
import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";
import SideBar from "./sidebar";

interface ILayout2 {
  children: JSX.Element;
}

export default function Layout2(props: ILayout2): JSX.Element {
  return (
    <div>
      <Header />
      <Banner />
      <Navigation />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}
