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
  sessionUserId: Scalars["ID"]["input"];
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
  sessionUserId: Scalars["ID"]["input"];
};

export type MutationSetUserAllergiesArgs = {
  allergenIds: Array<Scalars["ID"]["input"]>;
  sessionUserId: Scalars["ID"]["input"];
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

export type QueryCartArgs = {
  tableSessionID: Scalars["ID"]["input"];
};

export type QueryMenuCategoriesArgs = {
  restaurantId: Scalars["ID"]["input"];
};

export type QueryMenuItemsArgs = {
  restaurantId: Scalars["ID"]["input"];
};

export type QueryMenuItemsByCategoryArgs = {
  categoryId: Scalars["ID"]["input"];
  restaurantId: Scalars["ID"]["input"];
};

export type QueryOrderArgs = {
  orderId: Scalars["ID"]["input"];
};

export type QueryRestaurantArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTableSessionArgs = {
  tableSession: Scalars["ID"]["input"];
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

export type SubscriptionCartUpdatedArgs = {
  tableSessionId: Scalars["ID"]["input"];
};

export type SubscriptionOrderUpdatedArgs = {
  orderId: Scalars["ID"]["input"];
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
