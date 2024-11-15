import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@/gql/__generated__";

export default function Health() {
  const Query = gql(`
  query HealthCheckQuery { healthCheck }
  `);

  // call for graphql query
  const { data } = useSuspenseQuery(Query);
  return (
    <div>
      <h1>Health: {data.healthCheck}</h1>
    </div>
  );
}
