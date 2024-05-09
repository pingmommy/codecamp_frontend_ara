import styled from "@emotion/styled";
import CustomPaging from "../slider";

const Wrapper = styled.div`
  height: 200px;
  background-color: lightpink;
  padding: 0 40%;
`;
export default function Banner(): JSX.Element {
  return (
    <>
      <Wrapper>
        <CustomPaging />
      </Wrapper>
    </>
  );
}
