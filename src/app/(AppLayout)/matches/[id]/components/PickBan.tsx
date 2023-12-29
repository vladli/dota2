import { GetMatchByIdQuery } from "@/graphql/mathch";

type Props = {
  data: GetMatchByIdQuery;
};
export default function PickBan({ data }: Props) {
  return (
    <section className="mt-4 rounded-large bg-content1 p-4">
      <h1 className="text-xl font-semibold uppercase">Draft</h1>
    </section>
  );
}
