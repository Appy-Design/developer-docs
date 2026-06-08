---
title: Stamps
sidebar:
  order: 7
description: Award or adjust a customer's stamp balance via the REST API.
---

Award or adjust a customer's stamp balance. Both create a loyalty activity and run the normal downstream logic (VIP recalculation, etc.).

A customer's `{id}` is its Shopify customer ID.

## Award stamps

`POST /customers/{id}/stamps/award`

Add stamps (positive only).

**Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `stamps` | integer | yes | Number of stamps to award, must be ≥ 1. |
| `comment` | string | no | Customer-visible note shown on the activity. Defaults to the store's branded manual adjustment label. |
| `internal_comment` | string | no | Staff-only note, not shown to the customer. Defaults to "API adjustment". |

```json
// returns
{
  "customerId": "6677889900",
  "stampChange": 5,
  "stampBalance": 40
}
```

### Stamp result fields

Both the award and adjust endpoints return objects with these fields.

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | string | The affected customer's ID. |
| `stampChange` | integer | The stamp change applied (negative for deductions). |
| `stampBalance` | integer | Resulting stamp balance. |

## Adjust stamps

`POST /customers/{id}/stamps/adjust`

Adjust stamps up or down (use a negative value to deduct). `stamps` must not be `0`.

**Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `stamps` | integer | yes | Any non-zero integer (negative to deduct). |
| `comment` | string | no | Customer-visible note shown on the activity. Defaults to the store's branded manual adjustment label. |
| `internal_comment` | string | no | Staff-only note, not shown to the customer. Defaults to "API adjustment". |

```bash
curl -X POST https://stamp.appydesign.io/rest_api/v1/customers/6677889900/stamps/adjust \
  -H "X-Api-Key: ..." -H "X-Api-Secret: ..." -H "Content-Type: application/json" \
  -d '{"stamps": -3, "comment": "Manual correction", "internal_comment": "Stock count fix"}'
```

Returns a [stamp result](#stamp-result-fields).
