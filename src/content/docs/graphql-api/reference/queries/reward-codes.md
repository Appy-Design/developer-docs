---
title: Reward codes
sidebar:
  order: 8
description: "The rewardCodes query: list the discount codes a customer has been issued."
---

## `rewardCodes`

Returns the reward (discount) codes issued to a customer. Pass `available: true` to return only codes that haven't been used yet.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `available` | `Boolean` | No | When true, return only unused reward codes. |

Returns a non-null list of non-null [`RewardCode`](../../types/) objects (`[RewardCode!]!`).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Reward name. |
| `code` | `String` | The discount code. |
| `used` | `Boolean` | Whether it has been used. |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

### Example

```graphql
query ($id: ID!) {
  rewardCodes(customerId: $id, available: true) {
    id
    name
    code
    used
    createdAt
  }
}
```

```json
{
  "data": {
    "rewardCodes": [
      {
        "id": "551",
        "name": "Free coffee",
        "code": "LOYAL-7Q2X",
        "used": false,
        "createdAt": "2026-06-02T09:00:00Z"
      }
    ]
  }
}
```
