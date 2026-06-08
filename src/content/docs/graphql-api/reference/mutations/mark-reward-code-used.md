---
title: Mark reward code used
sidebar:
  order: 7
description: "The markRewardCodeUsed mutation: mark a code used and deactivate it in Shopify."
---

## `markRewardCodeUsed(customerId, rewardCodeId)`

Marks a reward code as used, for example after the discount has been applied at an external checkout. The code is also deactivated in Shopify so it can no longer be redeemed. No stamps are refunded.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID the code belongs to. |
| `rewardCodeId` | `ID!` | Yes | The reward code to mark used. |

Returns a non-null [`RewardCode`](../../types/) with `used` set to `true`.

### Returns / Fields

| Field | Type | Description |
|------|------|-------------|
| `id` | `ID!` | The reward code's identifier. |
| `name` | `String` | Reward name. |
| `code` | `String` | The discount code. |
| `used` | `Boolean` | Whether it has been used (now `true`). |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

### Example

```graphql
mutation {
  markRewardCodeUsed(customerId: "6677889900", rewardCodeId: "501") {
    id
    code
    used
  }
}
```

```json
{
  "data": {
    "markRewardCodeUsed": {
      "id": "501",
      "code": "APPY-5OFF-XXXX",
      "used": true
    }
  }
}
```

Returns an error with message `REWARD_CODE_NOT_FOUND` if the code does not belong to the customer, or `CUSTOMER_NOT_FOUND` for an unknown customer.
