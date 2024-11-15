export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export const metadata = {
  title: "Title - CHANGE ME!!!",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div>Implement me!! ID: {id}</div>
    </>
  );
}
