"use client";

import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { MockUser } from "@/features/mock/MockUser";

/**
 * ちょっとした説明
 * - MockFragmentはMockUserコンポーネントで定義されている
 * -> コンポーネントがこんな値欲しい！というのを親に伝えている
 * - useSuspenseQuery
 * -> loadingの処理を描かなくて良い
 * */

const Query = gql(/* GraphQL */ `
  query GetMockPage($id: ID!) {
    user(id: $id) {
      ...MockFragment
    }
  }
`);

export function MockPage() {
  const id = "1";
  const { data } = useSuspenseQuery(Query, { variables: { id } });
  return (
    <>
      <h1>モックページ</h1>
      <h3>APIレスポンス</h3>
      <div>
        <MockUser user={data.user} />
      </div>
    </>
  );
}
