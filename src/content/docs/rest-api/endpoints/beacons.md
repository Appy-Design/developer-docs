---
title: Beacons
sidebar:
  order: 5
description: List active on-site beacons and announcements via the REST API.
---

Active on-site beacons/announcements.

## List beacons

`GET /beacons`

Active on-site beacons/announcements.

```json
[
  {
    "id": "7",
    "name": "Double stamps weekend",
    "message": "Earn 2x this weekend!",
    "icon": "star",
    "active": true
  }
]
```

### Beacon fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier. |
| `name` | string | Display name. |
| `message` | string | Announcement text shown to customers. |
| `icon` | string | Icon identifier. |
| `active` | boolean | Whether the beacon is currently active. |
