---
title: Rewards
sidebar:
  order: 3
description: List and fetch redeemable reward products via the REST API.
---

Redeemable reward products (excludes POS-only and VIP-tier-locked rewards).

## List rewards

`GET /rewards`

```json
[
  {
    "id": "44",
    "name": "$5 off",
    "price": 10,
    "exchangeType": "stamps",
    "iconUrl": "https://..."
  }
]
```

`price` is the cost in stamps.

### Reward fields

Both the list and single-reward endpoints return objects with these fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `name` | string | Display name. |
| `price` | integer | Cost in stamps. |
| `exchangeType` | string | How the reward is exchanged. |
| `iconUrl` | string | Icon URL if set (omitted otherwise). |

## Get a reward

`GET /rewards/{id}`

Returns a single reward (see [Reward fields](#reward-fields)), or `404 REWARD_NOT_FOUND`.
