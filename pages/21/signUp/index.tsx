/* eslint-disable @typescript-eslint/no-misused-promises */
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent } from "react";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      email
      name
      _id
    }
  }
`;

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };
  const onChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.currentTarget.value);
  };

  const onclickSubmit = async (): Promise<void> => {
    // try catch 구문을 작성했는데, 제대로 작동하지 않았음. - createUser()가 비동기함수여서 프로미스를 반환하는데, 해당 프로미스를 처리하는 코드가 없었음.
    // async/await 를 사용하여 처리함.
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            name,
          },
        },
      });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      alert("가입을 축하합니다.");
      void router.push("/21/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      email: <input type="text" onChange={onChangeEmail} />
      name: <input type="text" onChange={onChangeName} />
      password: <input type="password" onChange={onChangePassword} />
      <button onClick={onclickSubmit}>가입하기</button>
    </div>
  );
}
