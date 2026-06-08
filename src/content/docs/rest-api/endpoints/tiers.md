---
title: VIP tiers
sidebar:
  order: 4
description: List and fetch VIP tiers via the REST API.
---

Your program's VIP tiers and their milestones.

## List tiers

`GET /tiers`

```json
[
  {
    "id": "3",
    "name": "Gold",
    "milestone": 500,
    "multiplier": 2,
    "iconUrl": "https://...",
    "benefits": "..."
  }
]
```

### Tier fields

Both the list and single-tier endpoints return objects with these fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `name` | string | Display name. |
| `milestone` | integer | Stamps required to reach the tier. |
| `multiplier` | number | Stamp-earning multiplier for members. |
| `iconUrl` | string | Icon URL if set (omitted otherwise). |
| `benefits` | string | Description of the tier's benefits. |

## Get a tier

`GET /tiers/{id}`

Returns a single tier (see [Tier fields](#tier-fields)), or `404 TIER_NOT_FOUND`.
