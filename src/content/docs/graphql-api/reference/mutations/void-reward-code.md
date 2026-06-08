---
title: Void reward code
sidebar:
  order: 8
description: "The voidRewardCode mutation: refund a code's stamps and deactivate it in Shopify."
---

## `voidRewardCode(customerId, rewardCodeId)`

Voids a reward code: the stamps spent on it are refunded to the customer and the code is deactivated in Shopify. Use it to reverse a redemption.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID the code belongs to. |
| `rewardCodeId` | `ID!` | Yes | The reward code to void. |

Returns a non-null [`RewardCode`](../../types/).

### Returns / Fields

| Field | Type | Description |
|------|------|-------------|
| `id` | `ID!` | The reward code's identifier. |
| `name` | `String` | Reward name. |
| `code` | `String` | The discount code. |
| `used` | `Boolean` | Whether it has been used. |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

### Example

```graphql
mutation {
  voidRewardCode(customerId: "6677889900", rewardCodeId: "501") {
    id
    code
  }
}
```

```json
{
  "data": {
    "voidRewardCode": {
      "id": "501",
      "code": "APPY-5OFF-XXXX"
    }
  }
}
```

Returns an error with message `REWARD_CODE_NOT_FOUND` if the code does not belong to the customer, `CUSTOMER_NOT_FOUND` for an unknown customer, or `VOID_FAILED` if the code cannot be voided.
