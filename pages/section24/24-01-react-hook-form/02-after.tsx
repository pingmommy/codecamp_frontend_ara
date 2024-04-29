import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  boardAddress: {
    addressDetail: string;
  };
}

export default function GraphqlMutationPage(): JSX.Element {
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = (data: IFormData): void => {
    console.log(data);
  };

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      주소: <input type="text" {...register("boardAddress.addressDetail")} />
      <button>GRAPHQL_API 요청하기</button>
    </form>
  );
}

/* <form> 원래 존재하는 태그.
우리가 클릭하게 되면 form 안에 바인딩이 되어 있는 함수가 실행됨. 
onsubmit이라는 속성에 함수를 바인딩하면 된다. 

form을 사용하는 이유는 하위태그들을 그룹핑하고 싶을 때 

form의 장점 중 하나는 

버튼태그의 옵션 중에 type이 있고 값을 reset으로 설정하면 
버튼을 클릭했을 때 그룹핑된 input 태그의 모든 내용이 다 지워진다.(빈 칸으로 바뀜)
<button type="reset">지우자!</button>


submit으로 값을 설정하면 버튼을 클릭했을 때
그룹을 만든 <form>태그에 바인딩된 함수가 실행된다. 
기본값이 submit이라서 옵션이 없으면 submit이다.
<button type="submit">등록하자</button>  or <button>등록하자</button>



만약 form 태그 안의 버튼에 클릭이벤트핸들러를 따로 등록한다면 
설정값을 button으로 해야 한다. 
button설정이 없다면 form에 바인딩된 함수와 버튼에 따로 바인딩된 함수가
동시에 실행된다. 

<button type="button" onClick={onclickBasket}>장바구니담기</button>
*/

// 기존의 방법은 입력하는대로 다 리렌더링됨. - 성능저하

/*
    <form onSubmit={wrapAsync(handleSubmit(onClickSubmit))}>
     ....  
     </form>

     => wrapAsync(handleSubmit(onClickSubmit))(event)인데 
     event는 자바스크립트가 붙여주므로 생략했다. 
     위의 form 태그에서 event의 기본적인 행동은 옵션 onSubmit에 들어온 event이기 때문에
     어딘가로 페이지를 이동하려고 한다. 
     (원래는 onsubmit="이동할 페이지")
    
     그래서 그런 기본적인 기능을 막아주고 싶다면?
         event.preventDefault();를 활용한다. 


*/
