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

## Grant a reward

`POST /customers/{id}/reward-grants`

Issue (comp) a reward to a customer at no stamp cost. This is the same as a redemption but the stamp balance is left untouched, useful for goodwill gestures or manual comps. A real discount code is issued.

**Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `reward_product_id` | integer | yes | The reward to grant (`id` from `/rewards`). |
| `variable_amount` | integer | no | Optional value for variable-value rewards. |

```json
// returns
{
  "code": "APPY-5OFF-XXXX",
  "name": "$5 off",
  "stampBalance": 35
}
```

The response shape matches a redemption, but `stampBalance` is unchanged because no stamps were spent. Returns `404 REWARD_NOT_FOUND` for an unknown reward.
