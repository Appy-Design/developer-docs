---
title: Activities
sidebar:
  order: 7
description: "The customerActivities query: page through a customer's loyalty ledger."
---

## `customerActivities`

Returns a cursor-paginated page of a customer's loyalty activities (their stamp ledger), newest first.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `limit` | `Int` | No | Page size, 1–1000, default 20. |
| `after` | `String` | No | Cursor for the next page. |
| `hasCount` | `Boolean` | No | Set true to include the total `count` (slower). |

Returns a non-null [`ActivityConnection`](../../types/), which wraps the page's `items` and its `pageInfo`.

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `items` | `[Activity!]!` | The records for this page. |
| `pageInfo` | `PageInfo!` | Pagination metadata (see below). |

Each item is an [`Activity`](../../types/):

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `label` | `String` | Human-readable description of the activity. |
| `stampChange` | `Int` | Stamps added or removed (negative for deductions). |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

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
query ($id: ID!) {
  customerActivities(customerId: $id, limit: 20) {
    items { id label stampChange createdAt }
    pageInfo { hasNext nextCursor }
  }
}
```

```json
{
  "data": {
    "customerActivities": {
      "items": [
        {
          "id": "98123",
          "label": "Placed an order",
          "stampChange": 3,
          "createdAt": "2026-06-01T10:15:00Z"
        }
      ],
      "pageInfo": {
        "hasNext": true,
        "nextCursor": "eyJpZCI6OTgxMjN9"
      }
    }
  }
}
```

Pass the returned `nextCursor` back as `$after` until `hasNext` is `false`.
