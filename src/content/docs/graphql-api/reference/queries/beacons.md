---
title: Beacons
sidebar:
  order: 5
description: "The beacons query: fetch the announcements shown to your customers."
---

## `beacons`

Returns every beacon (announcement) configured for your shop. Takes no arguments.

Returns a non-null list of non-null [`Beacon`](../../types/) objects (`[Beacon!]!`).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Beacon name. |
| `message` | `String` | Announcement text shown to customers. |
| `icon` | `String` | Icon identifier. |
| `active` | `Boolean` | Whether currently active. |

### Example

```graphql
query {
  beacons {
    id
    name
    message
    icon
    active
  }
}
```

```json
{
  "data": {
    "beacons": [
      {
        "id": "7",
        "name": "Double stamps weekend",
        "message": "Earn double beans all weekend!",
        "icon": "sparkles",
        "active": true
      }
    ]
  }
}
```
