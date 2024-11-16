/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type DateString = string & { readonly brand: unique symbol };
export type TimeString = string & { readonly brand: unique symbol };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Allergen = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type Cart = {
  id: Scalars["ID"]["output"];
  items: Array<CartItem>;
  tableSession: TableSession;
  totalCartPrice: Scalars["Int"]["output"];
};

export type CartItem = {
  addedBy: TableSessionUser;
  id: Scalars["ID"]["output"];
  menuItem: MenuItem;
  quantity: Scalars["Int"]["output"];
};

export type MenuCategory = {
  id: Scalars["ID"]["output"];
  menuItems: Array<MenuItem>;
  name: Scalars["String"]["output"];
};

export type MenuItem = {
  allergens: Array<Allergen>;
  available: Scalars["Boolean"]["output"];
  category: Maybe<MenuCategory>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
};

export type Mutation = {
  addItemToCart: Maybe<Cart>;
  completeTableSession: Maybe<Scalars["Boolean"]["output"]>;
  joinTableSession: Maybe<TableSessionUser>;
  placeOrder: Maybe<Scalars["Boolean"]["output"]>;
  removeItemFromCart: Maybe<Cart>;
  setUserAllergies: Maybe<TableSessionUser>;
};

export type MutationAddItemToCartArgs = {
  menuItemId: Scalars["ID"]["input"];
  orderId: Scalars["ID"]["input"];
  quantity: Scalars["Int"]["input"];
};

export type MutationCompleteTableSessionArgs = {
  sessionUserId: Scalars["ID"]["input"];
  tableSessionId: Scalars["ID"]["input"];
};

export type MutationJoinTableSessionArgs = {
  tableUUID: Scalars["ID"]["input"];
};

export type MutationPlaceOrderArgs = {
  orderId: Scalars["ID"]["input"];
};

export type MutationRemoveItemFromCartArgs = {
  orderId: Scalars["ID"]["input"];
  orderItemId: Scalars["ID"]["input"];
};

export type MutationSetUserAllergiesArgs = {
  allergenIds: Array<Scalars["ID"]["input"]>;
};

export type OrderedItem = {
  addedBy: TableSessionUser;
  id: Scalars["ID"]["output"];
  menuItem: MenuItem;
  price: Scalars["Int"]["output"];
  quantity: Scalars["Int"]["output"];
};

export type PlacedOrder = {
  id: Scalars["ID"]["output"];
  items: Array<OrderedItem>;
  tableSession: TableSession;
  totalPrice: Scalars["Int"]["output"];
};

export type Query = {
  allergens: Array<Allergen>;
  cart: Maybe<Cart>;
  healthCheck: Maybe<Scalars["String"]["output"]>;
  menuCategories: Array<MenuCategory>;
  menuItems: Array<MenuItem>;
  menuItemsByCategory: Array<MenuItem>;
  myCUUID: Scalars["String"]["output"];
  order: Maybe<OrderedItem>;
  restaurant: Maybe<Restaurant>;
  tableSession: Maybe<TableSession>;
};

export type QueryMenuCategoriesArgs = {
  restaurantId: Scalars["ID"]["input"];
};

export type QueryMenuItemsByCategoryArgs = {
  categoryId: Scalars["ID"]["input"];
};

export type Restaurant = {
  address: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  menuCategories: Array<MenuCategory>;
  menuItems: Array<MenuItem>;
  name: Scalars["String"]["output"];
  phoneNumber: Maybe<Scalars["String"]["output"]>;
};

export type Subscription = {
  cartUpdated: Maybe<Cart>;
  orderUpdated: Maybe<OrderedItem>;
};

export type Table = {
  capacity: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  restaurant: Restaurant;
  tableNumber: Scalars["String"]["output"];
};

export type TableSession = {
  cart: Cart;
  endTime: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  placedOrder: Maybe<PlacedOrder>;
  startTime: Scalars["String"]["output"];
  table: Table;
  totalUsers: Scalars["Int"]["output"];
};

export type TableSessionUser = {
  allergies: Array<Allergen>;
  tableSession: TableSession;
  userNumber: Scalars["Int"]["output"];
};

export type HealthCheckQueryQueryVariables = Exact<{ [key: string]: never }>;

export type HealthCheckQueryQuery = {
  healthCheck: string | null;
  myCUUID: string;
};

export type JoinTableSessionMutationVariables = Exact<{
  tableUUID: Scalars["ID"]["input"];
}>;

export type JoinTableSessionMutation = {
  joinTableSession: { tableSession: { id: string } } | null;
};

export type SetAllergiesMutationMutationVariables = Exact<{
  allergenIds: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type SetAllergiesMutationMutation = {
  setUserAllergies: { tableSession: { id: string } } | null;
};

export type GetMenuItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMenuItemsQuery = {
  menuItems: Array<{
    id: string;
    name: string;
    price: number;
    category: { id: string } | null;
    allergens: Array<{ id: string; name: string }>;
  }>;
};

export type GetAllergensQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllergensQuery = {
  allergens: Array<{ id: string; name: string }>;
};

export type GetCartQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartQueryQuery = {
  cart: {
    id: string;
    totalCartPrice: number;
    items: Array<{
      id: string;
      quantity: number;
      menuItem: { id: string; name: string; price: number };
    }>;
  } | null;
};

export const HealthCheckQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HealthCheckQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "healthCheck" } },
          { kind: "Field", name: { kind: "Name", value: "myCUUID" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HealthCheckQueryQuery,
  HealthCheckQueryQueryVariables
>;
export const JoinTableSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "JoinTableSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tableUUID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "joinTableSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tableUUID" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tableUUID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tableSession" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  JoinTableSessionMutation,
  JoinTableSessionMutationVariables
>;
export const SetAllergiesMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetAllergiesMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "allergenIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ID" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setUserAllergies" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "allergenIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "allergenIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tableSession" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetAllergiesMutationMutation,
  SetAllergiesMutationMutationVariables
>;
export const GetMenuItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMenuItems" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "menuItems" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allergens" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMenuItemsQuery, GetMenuItemsQueryVariables>;
export const GetAllergensDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAllergens" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allergens" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllergensQuery, GetAllergensQueryVariables>;
export const GetCartQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCartQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cart" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "menuItem" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "price" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "quantity" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalCartPrice" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCartQueryQuery, GetCartQueryQueryVariables>;
