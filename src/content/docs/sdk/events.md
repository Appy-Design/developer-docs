---
title: Events
description: SDK events you can listen to.
---

The SDK fires events at key moments. Subscribe with `appyStamp.on()` and unsubscribe with `appyStamp.off()`.

## Subscribing to events

```javascript
function onReady(data) {
  console.log('SDK ready, authenticated:', data.authenticated);
}

appyStamp.on('appy:ready', onReady);

// Later, to stop listening:
appyStamp.off('appy:ready', onReady);
```

## Available events

### appy:ready

Fires once when the SDK has finished initialising. Shop data has been loaded, and if customer data was provided, the customer has been authenticated.

```javascript
appyStamp.on('appy:ready', function (data) {
  // data.authenticated = true if customer was logged in
  if (data.authenticated) {
    appyStamp.customer().then(renderLoyaltyWidget);
  }
});
```

**Data:**

| Property | Type | Description |
|----------|------|-------------|
| `authenticated` | boolean | Whether a customer was successfully authenticated |

### appy:redeemed

Fires when a reward is successfully redeemed via `appyStamp.redeem()`.

```javascript
appyStamp.on('appy:redeemed', function (data) {
  alert('Your discount code: ' + data.code);
});
```

**Data:**

| Property | Type | Description |
|----------|------|-------------|
| `code` | string | The discount code |
| `name` | string | The reward name |
| `balance` | number | The customer's new stamp balance |

### appy:error

Fires when any SDK method encounters an error.

```javascript
appyStamp.on('appy:error', function (data) {
  console.error('SDK error in', data.method, ':', data.error);
});
```

**Data:**

| Property | Type | Description |
|----------|------|-------------|
| `method` | string | The SDK method that failed (e.g. "shop", "customer", "redeem/42") |
| `error` | string | The error message |
