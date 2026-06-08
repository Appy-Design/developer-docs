---
title: Shop
sidebar:
  order: 1
description: "The shop query: fetch your loyalty program's shop-level configuration."
---

## `shop`

Returns the shop-level configuration for your loyalty program: its display name, stamp branding, currency, and stamp-card size. Takes no arguments.

Returns a [`Shop`](../../types/) object (nullable).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `programName` | `String` | The loyalty program's display name. |
| `stampBrandingPlural` | `String` | The merchant's plural noun for stamps (e.g. "stamps", "beans"). |
| `stampCardValue` | `Int` | Number of stamps that make up one stamp card. |
| `currency` | `String` | ISO currency code. |
| `currencySymbol` | `String` | Display currency symbol. |

### Example

```graphql
query {
  shop {
    programName
    stampBrandingPlural
    stampCardValue
    currency
    currencySymbol
  }
}
```

```json
{
  "data": {
    "shop": {
      "programName": "Bean Club",
      "stampBrandingPlural": "beans",
      "stampCardValue": 10,
      "currency": "GBP",
      "currencySymbol": "£"
    }
  }
}
```
