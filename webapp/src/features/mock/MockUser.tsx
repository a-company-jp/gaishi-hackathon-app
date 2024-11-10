import { type DocumentType, gql } from "@/gql/__generated__";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MockFragment = gql(/* GraphQL */ `
  fragment MockFragment on User {
    username
    email
  }
`);

type Props = {
  user: DocumentType<typeof MockFragment>;
};

export function MockUser({ user }: Props) {
  return (
    <div>
      <p>ユーザー名</p>
      <b>{user.username}</b>
      <p>Eメール</p>
      <b>{user.email}</b>
    </div>
  );
}
