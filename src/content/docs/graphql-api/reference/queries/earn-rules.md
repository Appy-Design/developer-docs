---
title: Earn rules
sidebar:
  order: 2
description: "The earnRules and earnRule queries: list or fetch the ways customers earn stamps."
---

## `earnRules`

Returns every earn rule configured for your shop, the ways customers can earn stamps (orders, social actions, birthdays, etc.). Takes no arguments.

Returns a non-null list of non-null [`EarnRule`](../../types/) objects (`[EarnRule!]!`).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `type` | `String` | Rule type (e.g. order, social, birthday). |
| `step` | `Int` | Base stamps awarded per qualifying action. |
| `multiplier` | `Float` | Multiplier applied to step. |
| `iconUrl` | `String` | Icon URL if set. |

### Example

```graphql
query {
  earnRules {
    id
    name
    type
    step
    multiplier
    iconUrl
  }
}
```

```json
{
  "data": {
    "earnRules": [
      {
        "id": "12",
        "name": "Place an order",
        "type": "order",
        "step": 1,
        "multiplier": 1.0,
        "iconUrl": "https://cdn.appydesign.io/icons/order.svg"
      }
    ]
  }
}
```

## `earnRule(id)`

Returns a single earn rule by its ID.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | The record's ID. |

Returns an [`EarnRule`](../../types/) object (nullable, `null` if not found).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `type` | `String` | Rule type (e.g. order, social, birthday). |
| `step` | `Int` | Base stamps awarded per qualifying action. |
| `multiplier` | `Float` | Multiplier applied to step. |
| `iconUrl` | `String` | Icon URL if set. |

### Example

```graphql
query ($id: ID!) {
  earnRule(id: $id) {
    id
    name
    type
    step
    multiplier
  }
}
```

```json
{
  "data": {
    "earnRule": {
      "id": "12",
      "name": "Place an order",
      "type": "order",
      "step": 1,
      "multiplier": 1.0
    }
  }
}
```
