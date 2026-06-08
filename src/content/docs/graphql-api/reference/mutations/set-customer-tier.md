---
title: Set customer tier
sidebar:
  order: 9
description: "The setCustomerTier mutation: assign a customer to a VIP tier."
---

## `setCustomerTier(customerId, tierId, comment, internalComment)`

Assigns a customer to a VIP tier. The tier must belong to your shop. Rewards attached to the tier are not auto-issued by this call; it only sets the tier, matching the manual "assign tier" action in the admin.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | The Shopify customer ID. |
| `tierId` | `ID!` | Yes | The tier to assign. |
| `comment` | `String` | No | Customer-facing note recorded against the change. |
| `internalComment` | `String` | No | Staff-only note recorded against the change. |

Returns a non-null [`Customer`](../../types/) reflecting the new tier.

### Returns / Fields

Returns the updated [`Customer`](../../types/). See the type reference for the full field list.

### Example

```graphql
mutation {
  setCustomerTier(customerId: "6677889900", tierId: "3") {
    id
    vipTierId
    vipTierName
  }
}
```

```json
{
  "data": {
    "setCustomerTier": {
      "id": "6677889900",
      "vipTierId": 3,
      "vipTierName": "Gold"
    }
  }
}
```

Returns an error with message `TIER_NOT_FOUND` if the tier does not belong to your shop, `CUSTOMER_NOT_FOUND` for an unknown customer, or `TIER_UPDATE_FAILED` if the change could not be applied.
