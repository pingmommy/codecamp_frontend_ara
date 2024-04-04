import styled from "@emotion/styled";

const Wrapper = styled.div`
  height: 50px;
  background-color: tomato;
`;

export default function Header(): JSX.Element {
  return (
    <>
      <Wrapper>헤더영역</Wrapper>
    </>
  );
}
