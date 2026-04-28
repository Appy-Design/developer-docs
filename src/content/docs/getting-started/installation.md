---
title: Installation
description: How to add the Appy Stamp SDK to your website.
---

## Get your SDK keys

1. Open your Appy Stamp admin panel
2. Go to **Settings > Developers**
3. Click **Generate Keys** if you haven't already
4. Copy your **SDK Key** (public) and **SDK Secret** (private, keep this server-side)

## Add the script

Place this snippet in your HTML, ideally before the closing `</body>` tag:

```html
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY'
  };
</script>
<script async src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>
```

This loads the SDK with public-only access. Shop settings, earning rules, rewards, and VIP tiers will be available, but customer-specific data will not.

## Add customer authentication

To access customer data (balance, activity, redemption), you need to pass customer details and an HMAC hash. The hash must be computed **server-side** using your SDK Secret.

```html
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY',
    customer: {
      id: 12345,
      email: 'customer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      hash: 'HMAC_SHA256_HASH'
    }
  };
</script>
<script async src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>
```

See [Authentication](/getting-started/authentication) for how to compute the hash in different languages.

## Verify it works

Open your browser console and run:

```javascript
appyStamp.shop().then(console.log);
```

You should see your shop settings (program name, stamp branding, etc). If a customer is authenticated:

```javascript
appyStamp.customer().then(console.log);
```

## Configuration options

The `window.APPY_SDK` object accepts these properties:

| Property | Required | Description |
|----------|----------|-------------|
| `sdkKey` | Yes | Your public SDK key from Settings > Developers |
| `customer` | No | Customer object for authenticated access |
| `customer.id` | Yes (if customer) | The customer's ID in your system |
| `customer.email` | Yes (if customer) | The customer's email address |
| `customer.firstName` | Yes (if customer) | The customer's first name |
| `customer.lastName` | Yes (if customer) | The customer's last name |
| `customer.hash` | Yes (if customer) | HMAC-SHA256 hash (see Authentication) |
| `baseUrl` | No | Override the API base URL (for testing only) |
