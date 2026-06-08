---
title: Earn rules
sidebar:
  order: 2
description: List and fetch the ways customers earn stamps via the REST API.
---

The ways customers earn stamps.

## List earn rules

`GET /earn-rules`

```json
[
  {
    "id": "12",
    "name": "Place an order",
    "type": "order",
    "step": 1,
    "multiplier": 1,
    "iconUrl": "https://..."
  }
]
```

### Earn rule fields

Both the list and single-rule endpoints return objects with these fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `name` | string | Display name (branded/translated). |
| `type` | string | Rule type (e.g. `order`, `social`, `birthday`). |
| `step` | integer | Base stamps awarded per qualifying action. |
| `multiplier` | number | Multiplier applied to `step`. |
| `iconUrl` | string | Icon URL if set (omitted otherwise). |

## Get an earn rule

`GET /earn-rules/{id}`

Returns a single earn rule (see [Earn rule fields](#earn-rule-fields)), or `404 EARN_RULE_NOT_FOUND`.
