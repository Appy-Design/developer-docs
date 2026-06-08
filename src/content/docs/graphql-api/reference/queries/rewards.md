---
title: Rewards
sidebar:
  order: 3
description: "The rewards and reward queries: list or fetch the rewards customers can redeem."
---

## `rewards`

Returns every reward configured for your shop, the things customers can redeem stamps for. Takes no arguments.

Returns a non-null list of non-null [`Reward`](../../types/) objects (`[Reward!]!`).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `price` | `Int` | Cost in stamps. |
| `exchangeType` | `String` | How the reward is exchanged. |
| `iconUrl` | `String` | Icon URL if set. |

### Example

```graphql
query {
  rewards {
    id
    name
    price
    exchangeType
    iconUrl
  }
}
```

```json
{
  "data": {
    "rewards": [
      {
        "id": "44",
        "name": "Free coffee",
        "price": 10,
        "exchangeType": "free_product",
        "iconUrl": "https://cdn.appydesign.io/icons/coffee.svg"
      }
    ]
  }
}
```

## `reward(id)`

Returns a single reward by its ID.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | The record's ID. |

Returns a [`Reward`](../../types/) object (nullable, `null` if not found).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `price` | `Int` | Cost in stamps. |
| `exchangeType` | `String` | How the reward is exchanged. |
| `iconUrl` | `String` | Icon URL if set. |

### Example

```graphql
query ($id: ID!) {
  reward(id: $id) {
    id
    name
    price
    exchangeType
  }
}
```

```json
{
  "data": {
    "reward": {
      "id": "44",
      "name": "Free coffee",
      "price": 10,
      "exchangeType": "free_product"
    }
  }
}
```
