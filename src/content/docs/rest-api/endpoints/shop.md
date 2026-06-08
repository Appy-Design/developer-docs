---
title: Shop
sidebar:
  order: 1
description: Read your loyalty program's branding and currency settings via the REST API.
---

Read your loyalty program's branding and currency settings.

## Get shop settings

`GET /shop`

Returns your program branding and currency settings.

```json
{
  "programName": "Loyalty Rewards",
  "stampBrandingPlural": "stamps",
  "stampCardValue": 10,
  "currency": "USD",
  "currencySymbol": "$"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `programName` | string | The loyalty program's display name. |
| `stampBrandingPlural` | string | The merchant's plural noun for stamps (e.g. "stamps", "beans"). |
| `stampCardValue` | integer | Number of stamps that make up one stamp card. |
| `currency` | string | ISO currency code. |
| `currencySymbol` | string | Display currency symbol. |
