---
title: Public Methods
description: SDK methods that work without customer authentication.
---

These methods only require an SDK Key. No customer login needed.

## appyStamp.shop()

Returns shop configuration and branding settings.

```javascript
appyStamp.shop().then(function (data) {
  console.log(data);
});
```

**Returns:**

```json
{
  "program_name": "Loyalty Rewards",
  "stamp_branding_plural": "stamps",
  "stamp_card_value": 10,
  "currency": "USD",
  "currency_symbol": "$"
}
```

The result is cached after the first call. Subsequent calls return the cached data without making another request.

---

## appyStamp.earnRules(opts)

Returns active earning rules. These are the ways customers can earn stamps.

```javascript
// Get all rules
appyStamp.earnRules().then(function (data) {
  console.log(data.items);
});

// With pagination
appyStamp.earnRules({ page: 1 }).then(function (data) {
  console.log(data.items);
  console.log(data.has_more);  // true if more pages exist
  console.log(data.next_page); // next page number, or null
});
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | (all) | Page number. Omit to return all rules in one request. |

**Returns:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Place an Order",
      "icon_url": "https://storage.googleapis.com/.../place-order.svg",
      "step": 1,
      "multiplier": 1.0,
      "type": "shopify_online_order",
      "reward_value_type": "variable"
    }
  ],
  "has_more": false,
  "next_page": null
}
```

`has_more` and `next_page` are only present when you pass a `page` parameter.

---

## appyStamp.rewards(opts)

Returns available reward products that customers can redeem stamps for.

```javascript
// Get all rewards
appyStamp.rewards().then(function (data) {
  console.log(data.items);
});

// With pagination
appyStamp.rewards({ page: 1 }).then(function (data) {
  console.log(data.items);
});
```

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | (all) | Page number. Omit to return all rewards in one request. |

**Returns:**

```json
{
  "items": [
    {
      "id": 42,
      "name": "$5 discount code",
      "price": 50,
      "price_label": "50 stamps",
      "exchange_type": "fixed",
      "icon_url": "https://..."
    }
  ]
}
```

The `price_label` is pre-formatted with the correct unit. For card-based rewards it shows "1 card" instead of "1 stamps".

---

## appyStamp.vipTiers()

Returns VIP tier definitions, ordered by milestone.

```javascript
appyStamp.vipTiers().then(function (data) {
  console.log(data.items);
});
```

**Returns:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Bronze",
      "milestone": 0,
      "icon_url": null,
      "benefits": "Free shipping on orders over $50"
    },
    {
      "id": 2,
      "name": "Gold",
      "milestone": 100,
      "icon_url": "https://...",
      "benefits": "10% off all orders, free shipping"
    }
  ]
}
```

---

## appyStamp.beacons()

Returns active beacons (promotional messages).

```javascript
appyStamp.beacons().then(function (data) {
  console.log(data.items);
});
```

**Returns:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "Welcome Bonus",
      "message": "Sign up and earn 50 bonus stamps!",
      "icon": "product_bonus",
      "active": true
    }
  ]
}
```
