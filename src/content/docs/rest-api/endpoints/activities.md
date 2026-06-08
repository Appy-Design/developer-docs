---
title: Activities
sidebar:
  order: 8
description: Read a customer's loyalty ledger and process earn rules via the REST API.
---

Read a customer's loyalty ledger and process earn rules on their behalf.

A customer's `{id}` is its Shopify customer ID.

## List activities

`GET /customers/{id}/activities`

Cursor-paginated loyalty ledger for a customer (newest first).

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | integer | Page size, 1–1000 (default 20). |
| `after` | string | Cursor for the next page. |
| `before` | string | Cursor for the previous page. |
| `hasCount` | boolean | Include the total `count` in `meta.pagination` (slower). |

See [pagination](/rest-api/overview/#pagination) for details.

```json
[
  {
    "id": "9001",
    "label": "Placed an order",
    "stampChange": 5,
    "createdAt": "2026-06-05T12:00:00+00:00"
  }
]
```

### Activity fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `label` | string | Human-readable description of the activity. |
| `stampChange` | integer | Stamps added or removed (negative for deductions). |
| `createdAt` | string | ISO-8601 timestamp. |

### Pagination fields (`meta.pagination`)

| Field | Type | Description |
|-------|------|-------------|
| `hasNext` | boolean | Whether another page follows. |
| `hasPrevious` | boolean | Whether a previous page exists. |
| `nextCursor` | string | Cursor to fetch the next page (pass as `after`). |
| `previousCursor` | string | Cursor for the previous page (pass as `before`). |
| `count` | integer | Total matching records (only when `hasCount=true`, otherwise `null`). |

## Process an earn rule

`POST /customers/{id}/activities`

Process an earn rule for the customer (e.g. award stamps for completing a social follow or review).

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `earn_rule_id` | integer | yes | The earn rule to process (`id` from `/earn-rules`). |

```json
// returns
{
  "customerId": "6677889900",
  "stampChange": 5,
  "stampBalance": 45
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | string | The affected customer's ID. |
| `stampChange` | integer | The stamp change applied. |
| `stampBalance` | integer | Resulting stamp balance. |

Returns `404 EARN_RULE_NOT_FOUND` for an unknown rule, or `422 ACTIVITY_NOT_AWARDED` if the rule could not be awarded (e.g. rate-limited or the customer is ineligible).
