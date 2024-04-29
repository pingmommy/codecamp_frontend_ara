import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./02-after.validation";
import Input01 from "../../../src/component/commons/inputs/01";
import Button01 from "../../../src/component/commons/buttons/01";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  // email: string;
  // password: string;
  // phone: string;
  // boardAddress: {
  //   addressDetail: string;
  // };
}

export default function GraphqlMutationPage(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data: IFormData): void => {
    console.log(data);
  };

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자:
      <Input01 register={register("writer")} />
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      제목: <Input01 register={register("title")} />
      <div style={{ color: "red" }}>{formState.errors.title?.message}</div>
      내용: <Input01 register={register("contents")} />
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      {/* 주소: <input type="text" {...register("boardAddress.addressDetail")} /> */}
      <Button01 title="등록하기" isActive={formState.isValid} />
    </form>
  );
}

// 리액트 훅폼을 사용하게 되면서 레지스터가 들어가고
// 레지스터를 스프레드해서 쓰는데, 이런 환경에서 컴포넌트를 어떻게 분리할 수 있는가?

/*
<input type="text" {...register("writer")} />
이런 인풋창을 나만의 인풋으로 컴포넌트화해서 필요한 곳에 임포트해서 쓴다. 
이 때 register("writer")등을 어떻게 넘길 것인가?
*/
