"use client"

import {gql} from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";

const Query = gql(/* GraphQL */`
    query GetMockPage($id: ID!) {
        user(id: $id) {
            username
            email
        }
    }
`)

export function MockPage() {
    const id = "test"
    const { data, refetch } = useSuspenseQuery(Query, { variables: { id } })
    return (
        <>
            <h1>モックページ</h1>
        </>
    )
}