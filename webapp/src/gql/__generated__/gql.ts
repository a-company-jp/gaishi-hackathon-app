/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n  query HealthCheckQuery { healthCheck, myCUUID }\n  ":
    types.HealthCheckQueryDocument,
  "\n          mutation JoinTableSession($tableUUID: ID!) {\n            joinTableSession(tableUUID: $tableUUID){\n              tableSession {\n                id\n              }\n            }\n          }\n        ":
    types.JoinTableSessionDocument,
  "\n  mutation SetAllergiesMutation($sessionUserId: ID!, $allergenIds: [ID!]!) {\n    setUserAllergies (sessionUserId: $sessionUserId, allergenIds: $allergenIds) {\n      tableSession {\n        id\n      }\n    }\n  }\n":
    types.SetAllergiesMutationDocument,
  "\n  query GetMenuItems($restaurantId: ID!) {\n    menuItems(restaurantId: $restaurantId) {\n      id\n      name\n      price\n      category {\n        id\n      }\n      allergens {\n        id\n        name\n      }\n    }\n  }\n":
    types.GetMenuItemsDocument,
  "\n  mutation AddItemMutation($orderId: ID!, $menuItemId: ID!, $quantity: Int!, $sessionUserId: ID!) {\n    addItemToCart(orderId: $orderId, menuItemId: $menuItemId, quantity: $quantity, sessionUserId: $sessionUserId) {\n      items {\n        id\n      }\n    }\n  }\n":
    types.AddItemMutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query HealthCheckQuery { healthCheck, myCUUID }\n  "
): (typeof documents)["\n  query HealthCheckQuery { healthCheck, myCUUID }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n          mutation JoinTableSession($tableUUID: ID!) {\n            joinTableSession(tableUUID: $tableUUID){\n              tableSession {\n                id\n              }\n            }\n          }\n        "
): (typeof documents)["\n          mutation JoinTableSession($tableUUID: ID!) {\n            joinTableSession(tableUUID: $tableUUID){\n              tableSession {\n                id\n              }\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SetAllergiesMutation($sessionUserId: ID!, $allergenIds: [ID!]!) {\n    setUserAllergies (sessionUserId: $sessionUserId, allergenIds: $allergenIds) {\n      tableSession {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation SetAllergiesMutation($sessionUserId: ID!, $allergenIds: [ID!]!) {\n    setUserAllergies (sessionUserId: $sessionUserId, allergenIds: $allergenIds) {\n      tableSession {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMenuItems($restaurantId: ID!) {\n    menuItems(restaurantId: $restaurantId) {\n      id\n      name\n      price\n      category {\n        id\n      }\n      allergens {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetMenuItems($restaurantId: ID!) {\n    menuItems(restaurantId: $restaurantId) {\n      id\n      name\n      price\n      category {\n        id\n      }\n      allergens {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AddItemMutation($orderId: ID!, $menuItemId: ID!, $quantity: Int!, $sessionUserId: ID!) {\n    addItemToCart(orderId: $orderId, menuItemId: $menuItemId, quantity: $quantity, sessionUserId: $sessionUserId) {\n      items {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddItemMutation($orderId: ID!, $menuItemId: ID!, $quantity: Int!, $sessionUserId: ID!) {\n    addItemToCart(orderId: $orderId, menuItemId: $menuItemId, quantity: $quantity, sessionUserId: $sessionUserId) {\n      items {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
