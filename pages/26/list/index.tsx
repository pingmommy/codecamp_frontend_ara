import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import * as S from "./list.style";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

interface IPrev {
  __ref: string;
}
export default function ListPage(): JSX.Element {
  const { handleSubmit, register } = useForm();

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const [delete_board] = useMutation(DELETE_BOARD);

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickDelete = (id: string) => () => {
    void delete_board({
      variables: {
        boardId: id,
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev: readonly IPrev[], { readField }) => {
              const deleteId = data.deleteBoard;
              const FilteredPrev = prev.filter(
                (el) => readField("_id", el) !== deleteId
              );
              return [...FilteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = (data: any): void => {
    void 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: "제목이지요",
          contents: data.contents,
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  const onchangeContents = (value: string): void => {
    console.log(value);
  };
  return (
    <S.Form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      <S.Wrapper>
        <S.DivinedLine />
        {data?.fetchBoards.map((el) => (
          <S.Row key={el._id}>
            <S.Column>{el._id.slice(-4)}</S.Column>
            <S.ColumnTitle>{el.title}</S.ColumnTitle>
            <S.Column>{el.writer}</S.Column>
            <S.DeleteButton type="button" onClick={onClickDelete(el._id)}>
              X
            </S.DeleteButton>
          </S.Row>
        ))}
        <S.DivinedLine />
        <S.WriteBox>
          <S.flexWrapper>
            <S.Input placeholder="작성자" {...register("writer")} />
            <S.Input
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            />
          </S.flexWrapper>
          <S.flexWrapper>
            <ReactQuill
              onChange={onchangeContents}
              style={{
                width: "100%",
                height: "200px",
                border: "1px solid red",
              }}
            />
          </S.flexWrapper>

          <S.buttonWrapper>
            <S.submitButton>글등록하기</S.submitButton>
          </S.buttonWrapper>
        </S.WriteBox>
      </S.Wrapper>
    </S.Form>
  );
}
