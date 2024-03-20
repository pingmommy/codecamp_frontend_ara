import styled from "@emotion/styled";

const Wrapper = styled.div`
  height: 50px;
  background-color: lightblue;
`;

export default function LayoutHeader(): JSX.Element {
  return (
    <>
      <Wrapper>여기는 헤더입니다.</Wrapper>
    </>
  );
}
