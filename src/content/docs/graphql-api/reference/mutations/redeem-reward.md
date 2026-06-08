---
title: Redeem reward
sidebar:
  order: 5
description: "The redeemReward mutation: spend a customer's stamps on a reward and issue a discount code."
---

## `redeemReward(customerId, rewardProductId, variableAmount)`

Redeems a reward for a customer: deducts the reward's stamp cost and issues a discount code. For variable-value rewards, pass `variableAmount` to set how many stamps to spend.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `rewardProductId` | `ID!` | Yes | The reward to redeem. |
| `variableAmount` | `Int` | No | Stamp amount for variable-value rewards. |

Returns a non-null [`Redemption`](../../types/) carrying the issued code and the new balance.

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | The issued discount code. |
| `name` | `String` | Reward name. |
| `stampBalance` | `Int!` | Resulting stamp balance after deduction. |

### Example

```graphql
mutation {
  redeemReward(customerId: "6677889900", rewardProductId: "44") {
    code
    name
    stampBalance
  }
}
```

```json
{
  "data": {
    "redeemReward": {
      "code": "LOYAL-7Q2X",
      "name": "Free coffee",
      "stampBalance": 31
    }
  }
}
```

Returns an error with message `INSUFFICIENT_STAMPS` if the customer cannot afford it, or `REWARD_NOT_FOUND` if the reward does not exist.
