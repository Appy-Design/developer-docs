---
title: Reward codes
sidebar:
  order: 9
description: List a customer's earned reward fulfilments (discount codes) via the REST API.
---

A customer's earned reward fulfilments (discount codes).

A customer's `{id}` is its Shopify customer ID.

## List reward codes

`GET /customers/{id}/reward-codes`

The customer's earned reward fulfilments (discount codes).

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `available` | boolean | When `1`/true, return only unused codes. |

```json
[
  {
    "id": "501",
    "name": "$5 off",
    "code": "APPY-5OFF-XXXX",
    "used": false,
    "createdAt": "2026-06-05T12:00:00+00:00"
  }
]
```

### Reward code fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `name` | string | Reward name. |
| `code` | string | The discount code. |
| `used` | boolean | Whether the code has been used. |
| `createdAt` | string | ISO-8601 timestamp. |
