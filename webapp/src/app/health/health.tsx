"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@/gql/__generated__";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Health() {
  const Query = gql(`
  query HealthCheckQuery { healthCheck, myCUUID }
  `);
  const tenantId = useSelector((state: RootState) => state.tenantId.id);

  // call for graphql query
  const { data } = useQuery(Query);
  return (
    <div>
      <h1>Health: {data?.healthCheck}</h1>
      <h2>MyCUUID: {data?.myCUUID}</h2>
      <h2>Tenant ID: {tenantId}</h2>
    </div>
  );
}
