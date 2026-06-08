---
title: Inputs
sidebar:
  order: 4
description: Every input type in the Appy Stamp GraphQL schema, with field descriptions.
---

The input types accepted by mutations.

## UpdateCustomerInput

Input for [`updateCustomer`](/graphql-api/reference/mutations/update-customer/). Only the fields you supply are changed.

```graphql
input UpdateCustomerInput {
  birthdayMonth: Int
  birthdayDay: Int
  excluded: Boolean
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `birthdayMonth` | `Int` | No | Birthday month (1–12). |
| `birthdayDay` | `Int` | No | Birthday day (1–31). |
| `excluded` | `Boolean` | No | `true` removes the customer from the loyalty program (`state` becomes `removed`); `false` re-includes them, reading their state back from Shopify. |
