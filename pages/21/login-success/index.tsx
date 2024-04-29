import { gql, useQuery } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      name
      email
    }
  }
`;

export default function LoginSuccess(): JSX.Element {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  const name: string = data?.fetchUserLoggedIn?.name ?? "";

  return <div>{`${name}님 반갑습니다!!`}</div>;
}
