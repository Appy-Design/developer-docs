---
title: Process activity
sidebar:
  order: 4
description: "The processActivity mutation: run an earn rule for a customer and award its stamps."
---

## `processActivity(customerId, earnRuleId)`

Runs an earn rule for a customer, awarding the stamps that rule grants (its step times multiplier) and recording the activity. Use this when you want the program's configured earn logic to decide the amount, rather than specifying a raw number.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `earnRuleId` | `ID!` | Yes | The earn rule to process. |

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
  processActivity(customerId: "6677889900", earnRuleId: "12") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "processActivity": {
      "customerId": "6677889900",
      "stampChange": 1,
      "stampBalance": 41
    }
  }
}
```

Returns an error with message `ACTIVITY_NOT_AWARDED` if the rule could not be applied.
