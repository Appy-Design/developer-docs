---
title: Adjust stamps
sidebar:
  order: 3
description: "The adjustStamps mutation: apply an arbitrary stamp correction, positive or negative."
---

## `adjustStamps(customerId, stamps, comment, internalComment)`

Applies an arbitrary stamp correction to a customer's balance and records a loyalty activity. Unlike [`awardStamps`](../award-stamps/), the amount may be negative to deduct stamps; it must be a non-zero value.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `stamps` | `Int!` | Yes | Number of stamps to apply (any non-zero value; negative to deduct). |
| `comment` | `String` | No | Customer-visible note shown on the activity. Defaults to the store's branded manual adjustment label. |
| `internalComment` | `String` | No | Staff-only note, not shown to the customer. Defaults to "API adjustment". |

Returns a non-null [`StampResult`](../../types/) describing the applied change and the resulting balance.

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | `ID!` | The affected customer's ID. |
| `stampChange` | `Int!` | The stamp change applied. |
| `stampBalance` | `Int!` | Resulting stamp balance. |

### Example

```graphql
mutation {
  adjustStamps(customerId: "6677889900", stamps: -3, comment: "Correction", internalComment: "Stock count fix") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "adjustStamps": {
      "customerId": "6677889900",
      "stampChange": -3,
      "stampBalance": 37
    }
  }
}
```
