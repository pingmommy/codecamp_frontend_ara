import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  onClickCountUp = (): void => {
    this.setState({ count: 1 });
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트올리기!!</button>
      </>
    );
  }
}
