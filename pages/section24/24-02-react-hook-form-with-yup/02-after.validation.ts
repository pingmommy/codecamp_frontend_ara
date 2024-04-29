import * as yup from "yup";
export const schema = yup.object({
  writer: yup.string().required("작성자를 입력해주세요"),
  title: yup.string().required("제목을 입력해주세요"),
  contents: yup.string().required("내용을 입력해주세요"),

  //   email: yup
  //     .string()
  //     .email("이메일형식에 적합하지 않습니다.")
  //     .required("이메일은 필수 입력입니다."),

  //   password: yup
  //     .string()
  //     .min(4, "비밀번호는 최소 4자리 이상 입력하세요!")
  //     .max(15, "최대 15자리입니다")
  //     .required("비밀번호필수입력입니다."),

  //   phone: yup
  //     .string()
  //     .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대번호 형식에 알맞지 않습니다.")
  //     .required("휴대폰은 필수입력입니다."),
});

/*
  검증라이브러리에 대해서 배워보자. 
  검증라이브러리가 뭐냐?

  기존의 폼을 만들고 나서 그 폼을 검증하기 위해서 에러스테이트를 만들었다. 
  조건문으로 에러를 검증을 하고 에러에 해당하면 setError..()를 통해 화면에 
  빨간 색으로 표시하였다. 그 후엔 에러를 다시 지워주어야 했다. 
   이메일의 경우는 '@'를 포함하고 있는지 검증하는 로직을 따로 작성해야 했다. 

   근데 이러한 검증을 손쉽게 할 수 있는 라이브러리가 있다. =>'yup'
   yup과  react-hook-form 을 함께 사용할 수 있는데, yup이 react0hook-form에 포함된 것은 
   아니다.(yup은 독립적인 라이브러리, 어떤 폼과도 호환이 잘 된다.)

    yup과  react-hook-form 을 함께 사용하려면 
    yup과 함께 @hookform/resolvers도 설치해야 한다. 
  */
