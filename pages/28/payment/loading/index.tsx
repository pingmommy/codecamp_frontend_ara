import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      name
      email
    }
  }
`;

const CREATE_PointTransactionOfLoading = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      amount
      balance
      status
    }
  }
`;

declare const window: typeof globalThis & { IMP: any; crypto: any };

export default function LoadingPage(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(script);
  }, []);

  const [createPointTransactionOfLoading] = useMutation(
    CREATE_PointTransactionOfLoading
  );
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const name: string = data?.fetchUserLoggedIn?.name ?? "";
  const email: string = data?.fetchUserLoggedIn?.email ?? "";

  const onclickPayment = (): void => {
    window.IMP.init("imp49910675");

    window.IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `payment-${window.crypto.randomUUID()}`, // 주문 고유 번호
        name: "point",
        amount: 500,
        buyer_email: email,
        buyer_name: name,
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공시
          try {
            const result = await createPointTransactionOfLoading({
              variables: {
                impUid: rsp.imp_uid,
              },
            });
            console.log(result);
            void router.push("/28/payment/complete");
          } catch (err) {
            if (err instanceof Error) {
              console.log(err);
            }
          }
        } else {
          // 결제 실패시
          console.log("실패");
        }
      }
    );
  };

  return (
    <>
      <div>
        <div>{`${name}님 반갑습니다!!`}</div>
        <select id="point">
          <option value="500">500</option>
          <option value="1000">100</option>
          <option value="2000">200</option>
          <option value="5000">5000</option>
        </select>
        <button onClick={onclickPayment}>충전하기</button>
      </div>
    </>
  );
}
