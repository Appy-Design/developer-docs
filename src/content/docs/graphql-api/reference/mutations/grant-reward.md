---
title: Grant reward
sidebar:
  order: 6
description: "The grantReward mutation: comp a reward to a customer with no stamp cost."
---

## `grantReward(customerId, rewardProductId, variableAmount)`

Grants (comps) a reward to a customer without deducting any stamps, and issues a real discount code. Use it for goodwill gestures or manual comps. It mirrors [`redeemReward`](../redeem-reward/) but leaves the stamp balance untouched.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `rewardProductId` | `ID!` | Yes | The reward to grant. |
| `variableAmount` | `Int` | No | Value for variable-value rewards. |

Returns a non-null [`Redemption`](../../types/) carrying the issued code and the customer's (unchanged) balance.

### Returns / Fields

| Field | Type | Description |
|------|------|-------------|
| `code` | `String` | The issued discount code. |
| `name` | `String` | Reward name. |
| `stampBalance` | `Int!` | The customer's stamp balance (unchanged, since no stamps were spent). |

### Example

```graphql
mutation {
  grantReward(customerId: "6677889900", rewardProductId: "44") {
    code
    name
    stampBalance
  }
}
```

```json
{
  "data": {
    "grantReward": {
      "code": "APPY-7Q2X",
      "name": "Free coffee",
      "stampBalance": 35
    }
  }
}
```

Returns an error with message `REWARD_NOT_FOUND` if the reward does not exist, or `CUSTOMER_NOT_FOUND` for an unknown customer.
