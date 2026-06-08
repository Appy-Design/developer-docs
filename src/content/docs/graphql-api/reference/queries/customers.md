---
title: Customers
sidebar:
  order: 6
description: "The customers and customer queries: page through loyalty members or fetch one by Shopify ID."
---

## `customers`

Returns a cursor-paginated page of your shop's loyalty customers.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `Int` | No | Page size, 1–1000, default 20. |
| `after` | `String` | No | Cursor for the next page. |
| `before` | `String` | No | Cursor for the previous page. |
| `hasCount` | `Boolean` | No | Set true to include the total `count` (slower). |

Returns a non-null [`CustomerConnection`](../../types/), which wraps the page's `items` and its `pageInfo`.

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `items` | `[Customer!]!` | The records for this page. |
| `pageInfo` | `PageInfo!` | Pagination metadata (see below). |

Each item is a [`Customer`](../../types/):

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | The Shopify customer ID (the customer's identity everywhere). |
| `firstName` | `String` | The customer's first name. |
| `lastName` | `String` | The customer's last name. |
| `email` | `String` | The customer's email address. |
| `stampBalance` | `Int` | Current redeemable stamp balance. |
| `vipTierId` | `Int` | Current VIP tier ID (if any). |
| `vipTierName` | `String` | Current VIP tier name. |
| `dateOfBirth` | `String` | "dd-mm" string. |
| `state` | `String` | Loyalty state of the customer. |
| `mergedIntoCustomerId` | `Int` | If the customer was merged, the kept customer's ID. |

The `pageInfo` field is a [`PageInfo`](../../types/):

| Field | Type | Description |
|-------|------|-------------|
| `hasNext` | `Boolean!` | Whether another page follows. |
| `hasPrevious` | `Boolean!` | Whether a previous page exists. |
| `nextCursor` | `String` | Cursor to fetch the next page (pass as `after`). |
| `previousCursor` | `String` | Cursor for the previous page (pass as `before`). |
| `count` | `Int` | Total matching records (only when `hasCount: true`, otherwise null). |

### Example

```graphql
query ($after: String) {
  customers(limit: 50, after: $after) {
    items { id firstName stampBalance }
    pageInfo { hasNext nextCursor }
  }
}
```

```json
{
  "data": {
    "customers": {
      "items": [
        {
          "id": "6677889900",
          "firstName": "Ada",
          "stampBalance": 35
        }
      ],
      "pageInfo": {
        "hasNext": true,
        "nextCursor": "eyJpZCI6NjY3Nzg4OTkwMH0="
      }
    }
  }
}
```

Pass the returned `nextCursor` back as `$after` until `hasNext` is `false`.

## `customer(id)`

Returns a single customer by their Shopify customer ID.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | The Shopify customer ID. |

Returns a [`Customer`](../../types/) object (nullable, `null` if not found).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | The Shopify customer ID (the customer's identity everywhere). |
| `firstName` | `String` | The customer's first name. |
| `lastName` | `String` | The customer's last name. |
| `email` | `String` | The customer's email address. |
| `stampBalance` | `Int` | Current redeemable stamp balance. |
| `vipTierId` | `Int` | Current VIP tier ID (if any). |
| `vipTierName` | `String` | Current VIP tier name. |
| `dateOfBirth` | `String` | "dd-mm" string. |
| `state` | `String` | Loyalty state of the customer. |
| `mergedIntoCustomerId` | `Int` | If the customer was merged, the kept customer's ID. |

### Example

```graphql
query ($id: ID!) {
  customer(id: $id) {
    id
    firstName
    lastName
    email
    stampBalance
    vipTierName
  }
}
```

```json
{
  "data": {
    "customer": {
      "id": "6677889900",
      "firstName": "Ada",
      "lastName": "Lovelace",
      "email": "ada@example.com",
      "stampBalance": 35,
      "vipTierName": "Gold"
    }
  }
}
```
