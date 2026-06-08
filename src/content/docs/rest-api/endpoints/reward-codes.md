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

## Mark a code as used

`POST /customers/{id}/reward-codes/{codeId}/use`

Marks a reward code as used, for example after the discount has been applied at an external checkout. The code is also deactivated in Shopify so it can no longer be redeemed. No stamps are refunded.

This call takes no body and returns the updated reward code object (see [Reward code fields](#reward-code-fields)) with `used` set to `true`. An unknown code returns `404 REWARD_CODE_NOT_FOUND`.

## Void a code

`POST /customers/{id}/reward-codes/{codeId}/void`

Voids a reward code: the stamps spent on it are refunded to the customer and the code is deactivated in Shopify. Use this to reverse a redemption.

This call takes no body and returns the updated reward code object (see [Reward code fields](#reward-code-fields)). An unknown code returns `404 REWARD_CODE_NOT_FOUND`; a code that cannot be voided returns `422 VOID_FAILED`.

:::note[Both actions deactivate the Shopify code]
Marking a code used and voiding a code both deactivate the underlying discount in Shopify, so the code cannot be redeemed again after either call.
:::
