---
title: VIP tiers
sidebar:
  order: 4
description: "The tiers and tier queries: list or fetch the VIP tiers of your program."
---

## `tiers`

Returns every VIP tier configured for your shop. Takes no arguments.

Returns a non-null list of non-null [`Tier`](../../types/) objects (`[Tier!]!`).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Tier name. |
| `milestone` | `Int` | Stamps required to reach the tier. |
| `multiplier` | `Float` | Stamp-earning multiplier for members. |
| `iconUrl` | `String` | Icon URL. |
| `benefits` | `String` | Description of the tier's benefits. |

### Example

```graphql
query {
  tiers {
    id
    name
    milestone
    multiplier
    iconUrl
    benefits
  }
}
```

```json
{
  "data": {
    "tiers": [
      {
        "id": "3",
        "name": "Gold",
        "milestone": 100,
        "multiplier": 1.5,
        "iconUrl": "https://cdn.appydesign.io/icons/gold.svg",
        "benefits": "1.5x stamps on every order"
      }
    ]
  }
}
```

## `tier(id)`

Returns a single VIP tier by its ID.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | The record's ID. |

Returns a [`Tier`](../../types/) object (nullable, `null` if not found).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Tier name. |
| `milestone` | `Int` | Stamps required to reach the tier. |
| `multiplier` | `Float` | Stamp-earning multiplier for members. |
| `iconUrl` | `String` | Icon URL. |
| `benefits` | `String` | Description of the tier's benefits. |

### Example

```graphql
query ($id: ID!) {
  tier(id: $id) {
    id
    name
    milestone
    multiplier
    benefits
  }
}
```

```json
{
  "data": {
    "tier": {
      "id": "3",
      "name": "Gold",
      "milestone": 100,
      "multiplier": 1.5,
      "benefits": "1.5x stamps on every order"
    }
  }
}
```
