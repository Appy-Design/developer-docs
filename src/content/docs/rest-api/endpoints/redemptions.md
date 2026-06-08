---
title: Redemptions
sidebar:
  order: 10
description: Redeem a reward on behalf of a customer via the REST API.
---

Redeem a reward on behalf of a customer.

A customer's `{id}` is its Shopify customer ID.

## Redeem a reward

`POST /customers/{id}/redemptions`

Redeem a reward on behalf of a customer. Deducts the stamp cost and returns a discount code.

**Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `reward_product_id` | integer | yes | The reward to redeem (`id` from `/rewards`). |
| `variable_amount` | integer | no | Optional stamp amount for variable-value rewards. |

```json
// returns
{
  "code": "APPY-5OFF-XXXX",
  "name": "$5 off",
  "stampBalance": 30
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | The issued discount code. |
| `name` | string | Reward name. |
| `stampBalance` | integer | Resulting stamp balance after deduction. |

Returns `422 INSUFFICIENT_STAMPS` if the customer cannot afford the reward, or `404 REWARD_NOT_FOUND` for an unknown reward.
