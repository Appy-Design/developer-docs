---
title: Award stamps
sidebar:
  order: 2
description: "The awardStamps mutation: add stamps to a customer's balance."
---

## `awardStamps(customerId, stamps, comment, internalComment)`

Adds stamps to a customer's balance and records a loyalty activity. Use this for positive awards (e.g. a bonus). To deduct or make arbitrary corrections, use [`adjustStamps`](../adjust-stamps/) instead.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `stamps` | `Int!` | Yes | Number of stamps to award (must be ≥ 1). |
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
  awardStamps(customerId: "6677889900", stamps: 5, comment: "Birthday bonus", internalComment: "Awarded via API") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "awardStamps": {
      "customerId": "6677889900",
      "stampChange": 5,
      "stampBalance": 40
    }
  }
}
```
