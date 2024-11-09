"use client";

import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
} from "@apollo/client";

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const client = createClient();
  return Provider({ client, children });
};

const createClient = () => {
  // NOTE: SSR時にApolloの内部で実行されるfetch()リクエストがキャッシュを使用するため,
  // Render時にHydration errorが発生してしまうので, link.fetchOptions.cacheを"no-store"に設定する
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL}/api/v1/query`,
    credentials: "include",
    fetchOptions: {
      cache: "no-store",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
    link: httpLink,
  });
};
