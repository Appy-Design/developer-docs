---
title: GraphQL API Overview
sidebar:
  order: 1
description: A typed, single-endpoint GraphQL interface over the Appy Stamp loyalty engine.
---

The Appy Stamp GraphQL API gives you the same loyalty data and capabilities as the [REST API](/rest-api/overview/) through a single typed endpoint. Choose GraphQL when you want to fetch exactly the fields you need in one round-trip, or prefer a self-describing, introspectable schema.

:::caution[Closed beta]
The REST & GraphQL API is currently in **closed beta**. It must be enabled for your store before your credentials will work. [Contact us](https://appydesign.co.uk/contact) to request access.
:::

## Endpoint

```
POST https://stamp.appydesign.io/graphql
```

A single endpoint serves every query and mutation.

## Authentication

Authenticate as the merchant with the `X-Api-Key` and `X-Api-Secret` headers (the same credentials as REST). See [Authentication](/graphql-api/authentication/) for detail, and [Installation](/graphql-api/installation/) to run your first query.

## Making a request

Send a JSON body with `query` and optional `variables`:

```bash
curl -X POST https://stamp.appydesign.io/graphql \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query ($id: ID!) { customer(id: $id) { id firstName stampBalance } }",
    "variables": { "id": "6677889900" }
  }'
```

```json
{
  "data": {
    "customer": {
      "id": "6677889900",
      "firstName": "Ada",
      "stampBalance": 35
    }
  }
}
```

Responses follow the standard GraphQL shape (`{ "data": ... }`, plus `{ "errors": [...] }` when something goes wrong), not the REST envelope.

## Errors

Failures appear in the `errors` array. Expected, client-safe conditions carry the same codes as the REST API in the error `message` (e.g. `CUSTOMER_NOT_FOUND`, `REWARD_NOT_FOUND`, `INSUFFICIENT_STAMPS`, `ACTIVITY_NOT_AWARDED`):

```json
{
  "data": {
    "customer": null
  },
  "errors": [
    {
      "message": "CUSTOMER_NOT_FOUND",
      "path": ["customer"]
    }
  ]
}
```

## Tenant scoping

Every query and mutation is automatically scoped to the shop identified by your API key. You can only read and write your own shop's customers, rewards, activities, and tiers. IDs belonging to another shop resolve as "not found".

## Introspection

The schema is introspectable, so GraphQL clients, code generators, and IDE tooling (GraphiQL, Apollo, Insomnia, etc.) can discover types and fields automatically. Point your tool at the endpoint with your API headers.

## Next steps

See the [Schema reference](/graphql-api/reference/queries/shop/) for the full type system and every query and mutation, or the [REST API](/rest-api/overview/) for the equivalent resource-oriented interface.
