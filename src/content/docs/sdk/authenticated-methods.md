---
title: Authenticated Methods
description: SDK methods that require customer authentication.
---

These methods require a customer to be authenticated via the `window.APPY_SDK.customer` config. If called without authentication, they reject with an error.

## appyStamp.customer()

Returns the authenticated customer's loyalty data.

```javascript
appyStamp.customer().then(function (customer) {
  console.log(customer);
});
```

**Returns:**

```json
{
  "id": 12345,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "cards": 4,
  "stamps": 2,
  "stamps_label": "stamps",
  "vip_tier_name": "Gold",
  "vip_tier_id": 3,
  "next_reward": {
    "name": "$5 discount code",
    "stamps_needed": 8
  },
  "available_rewards": 2,
  "stamps_expires_at": "2026-12-31T00:00:00+00:00",
  "vip_expires_at": "2026-12-31"
}
```

The balance is shown as cards and stamps (not a raw total). The `stamps_label` reflects the merchant's custom branding (e.g. "beans", "points", "stars").

The result is cached after the first call. Subsequent calls return the cached data.

---

## appyStamp.activity(opts)

Returns the customer's stamp activity history, newest first.

```javascript
appyStamp.activity({ page: 1 }).then(function (data) {
  console.log(data.items);
});
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | 1 | Page number |

**Returns:**

```json
{
  "items": [
    {
      "id": 1001,
      "label": "Placed an order",
      "stamp_change": 12,
      "created_at": "2026-04-20T10:30:00+00:00"
    },
    {
      "id": 1000,
      "label": "Redeemed $5 discount",
      "stamp_change": -50,
      "created_at": "2026-04-18T14:00:00+00:00"
    }
  ],
  "has_more": true,
  "next_page": 2
}
```

Positive `stamp_change` values are earnings. Negative values are spends/redemptions.

---

## appyStamp.rewardCodes(opts)

Returns the customer's earned reward codes (discount codes from redemptions).

```javascript
// All codes
appyStamp.rewardCodes({ page: 1 }).then(function (data) {
  console.log(data.items);
});

// Only unused codes
appyStamp.rewardCodes({ page: 1, available: true }).then(function (data) {
  console.log(data.items);
});
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `available` | boolean | false | If true, only return unused codes |

**Returns:**

```json
{
  "items": [
    {
      "id": 501,
      "name": "$5 discount code",
      "code": "SAVE5-X2K9",
      "used": false,
      "created_at": "2026-04-15T08:00:00+00:00"
    }
  ],
  "has_more": false,
  "next_page": null
}
```

---

## appyStamp.redeem(rewardProductId, opts)

Redeems a reward product and returns a discount code. The customer's stamp balance is deducted automatically.

```javascript
appyStamp.redeem(42).then(function (result) {
  console.log(result.code);    // "SAVE5-X2K9"
  console.log(result.name);    // "$5 discount code"
  console.log(result.balance); // 45 (new stamp balance)
});
```

For variable-value rewards, pass the amount:

```javascript
appyStamp.redeem(42, { variableAmount: 100 }).then(function (result) {
  console.log(result);
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rewardProductId` | number | Yes | The reward product ID (from `rewards()`) |
| `opts.variableAmount` | number | No | Stamp amount for variable-value rewards |

**Returns:**

```json
{
  "code": "SAVE5-X2K9",
  "name": "$5 discount code",
  "balance": 45
}
```

Fires the `appy:redeemed` event on success. Returns a rejected Promise if the customer does not have enough stamps.

---

## appyStamp.processActivity(ruleId)

Triggers an activity for the customer (social follows, reviews, etc). Only works for activity types that support client-side triggering.

```javascript
appyStamp.processActivity(7).then(function (result) {
  console.log(result); // { success: true }
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ruleId` | number | Yes | The activity rule ID (from `earnRules()`) |

---

## appyStamp.updateBirthday(month, day)

Updates the customer's date of birth. Used for birthday reward eligibility.

```javascript
appyStamp.updateBirthday(12, 25).then(function (result) {
  console.log(result); // { success: true }
});
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `month` | number | Yes | Month (1-12) |
| `day` | number | Yes | Day (1-31) |

---

## appyStamp.isAuthenticated()

Returns `true` if the customer has been authenticated. This is synchronous (not a Promise).

```javascript
if (appyStamp.isAuthenticated()) {
  // safe to call authenticated methods
}
```
