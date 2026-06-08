---
title: Customers
sidebar:
  order: 6
description: List, fetch, and update customers via the REST API.
---

Read and update the customers in your shop.

:::note[Customers come from Shopify]
Customers are created in Shopify and synced to Appy Stamp automatically. This API updates existing customers; it does not create them. A customer's `{id}` is its Shopify customer ID. Updating an unknown id returns `404 CUSTOMER_NOT_FOUND`.
:::

## List customers

`GET /customers`

Cursor-paginated list of your customers (oldest first).

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | integer | Page size, 1–1000 (default 20). |
| `after` | string | Cursor for the next page. |
| `before` | string | Cursor for the previous page. |
| `hasCount` | boolean | Include the total `count` in `meta.pagination` (slower). |

See [pagination](/rest-api/overview/#pagination) for details.

```json
// data
[
  {
    "id": "6677889900",
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "stampBalance": 35,
    "vipTierId": 3,
    "vipTierName": "Gold",
    "dateOfBirth": "09-04",
    "state": "active"
  }
]
// meta.pagination
{
  "hasNext": true,
  "hasPrevious": false,
  "nextCursor": "aWQ6NjY3Nzg4OTkwMA==",
  "previousCursor": "...",
  "count": null
}
```

`dateOfBirth` is a `dd-mm` string. `mergedIntoCustomerId` is present only when the customer has been merged into another.

### Customer fields

Returned by every customer endpoint (list, get, and update). Null fields are omitted from REST responses.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | The Shopify customer ID (the customer's identity everywhere). |
| `firstName` | string | Customer's first name. |
| `lastName` | string | Customer's last name. |
| `email` | string | Customer's email address. |
| `stampBalance` | integer | Current redeemable stamp balance. |
| `vipTierId` | integer | Current VIP tier ID (if any). |
| `vipTierName` | string | Current VIP tier name (if any). |
| `dateOfBirth` | string | Day and month of birth as a `dd-mm` string. |
| `state` | string | Loyalty state of the customer. |
| `mergedIntoCustomerId` | string | If the customer was merged, the kept customer's ID (omitted otherwise). |

### Pagination fields (`meta.pagination`)

| Field | Type | Description |
|-------|------|-------------|
| `hasNext` | boolean | Whether another page follows. |
| `hasPrevious` | boolean | Whether a previous page exists. |
| `nextCursor` | string | Cursor to fetch the next page (pass as `after`). |
| `previousCursor` | string | Cursor for the previous page (pass as `before`). |
| `count` | integer | Total matching records (only when `hasCount=true`, otherwise `null`). |

## Get a customer

`GET /customers/{id}`

Returns a single customer by Shopify customer ID (see [Customer fields](#customer-fields)), or `404 CUSTOMER_NOT_FOUND`.

## Update a customer

`PATCH /customers/{id}`

Update an existing customer's birthday. Returns `404 CUSTOMER_NOT_FOUND` if the ID is unknown.

Only app-owned fields are writable. Customer name, email, and phone are owned by Shopify and are not editable through this API.

**Body:**

| Field | Type | Description |
|-------|------|-------------|
| `birthday_month` | integer | Month of birth, 1–12 (send with `birthday_day`). |
| `birthday_day` | integer | Day of birth, 1–31 (send with `birthday_month`). |
| `excluded` | boolean | `true` removes the customer from the loyalty program (`state` becomes `removed`); `false` re-includes them. See below. |

When `excluded` is `true`, the customer is ineligible for the program: they are excluded from earning, birthday and anniversary rewards, and balance recalculation. This exclusion is preserved when Shopify syncs the customer and is not silently undone. Setting `excluded` to `false` re-includes the customer, and their account state is read back from Shopify so it reflects reality.

```json
{ "excluded": true }
```

Returns the updated customer object (see [Customer fields](#customer-fields)).
