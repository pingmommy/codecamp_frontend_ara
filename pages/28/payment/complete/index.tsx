import { gql, useQuery } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      name
      email
      userPoint {
        _id
        amount
        createdAt
        updatedAt
      }
    }
  }
`;

export default function CompletePage(): JSX.Element {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  console.log(data);
  return (
    <>
      <div>완료</div>
    </>
  );
}
