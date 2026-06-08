---
title: Update customer
sidebar:
  order: 1
description: "The updateCustomer mutation: update an existing loyalty customer's profile."
---

## `updateCustomer(id, input)`

Updates the birthday of an existing loyalty customer, identified by their Shopify customer ID. Only the fields you supply are changed.

Profile fields are owned by Shopify and are not editable here. Customer name, email, and phone are synced from Shopify and cannot be changed through this mutation.

### Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | The Shopify customer ID. |
| `input` | `UpdateCustomerInput!` | Yes | The fields to update (see below). |

The [`UpdateCustomerInput`](../../inputs/) fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `birthdayMonth` | `Int` | No | Birthday month (1–12). |
| `birthdayDay` | `Int` | No | Birthday day (1–31). |
| `excluded` | `Boolean` | No | `true` removes the customer from the loyalty program (`state` becomes `removed`); `false` re-includes them. |

When `excluded` is `true`, the customer is ineligible for earning, birthday and anniversary rewards, and balance recalculation, and this is preserved across Shopify syncs. Setting it to `false` re-includes the customer and reads their account state back from Shopify.

Returns a [`Customer`](../../types/) object (nullable, `null` if the customer is not found).

### Returns / Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | The Shopify customer ID (the customer's identity everywhere). |
| `firstName` | `String` | The customer's first name. |
| `lastName` | `String` | The customer's last name. |
| `email` | `String` | The customer's email address. |
| `stampBalance` | `Int` | Current redeemable stamp balance. |
| `vipTierId` | `Int` | Current VIP tier ID (if any). |
| `vipTierName` | `String` | Current VIP tier name. |
| `dateOfBirth` | `String` | "dd-mm" string. |
| `state` | `String` | Loyalty state of the customer. |
| `mergedIntoCustomerId` | `Int` | If the customer was merged, the kept customer's ID. |

### Example

```graphql
mutation ($id: ID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    id
    dateOfBirth
  }
}
```

```json
{
  "id": "6677889900",
  "input": {
    "birthdayMonth": 12,
    "birthdayDay": 10
  }
}
```

```json
{
  "data": {
    "updateCustomer": {
      "id": "6677889900",
      "dateOfBirth": "10-12"
    }
  }
}
```

Toggle exclusion:

```graphql
mutation ($id: ID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    id
    state
  }
}
```

```json
{
  "id": "6677889900",
  "input": {
    "excluded": true
  }
}
```
