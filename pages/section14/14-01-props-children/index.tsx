import Example from "../../../src/component/unit/14-props-children-example";

export default function PropsChildrenPage(): JSX.Element {
  return (
    <Example school="다람쥐초등학교">
      <div>
        <div>이건 props.children</div>
      </div>
    </Example>
  );
}
