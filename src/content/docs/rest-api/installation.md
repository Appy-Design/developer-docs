---
title: Installation
sidebar:
  order: 2
description: "Get access to the REST API and make your first request."
---

## 1. Request access

The REST API is in closed beta and runs on paid plans. [Contact us](https://appydesign.co.uk/contact) to enable it for your store.

## 2. Get your credentials

In your Appy Stamp admin, open **Settings → Developers** and find the **API Access (REST & GraphQL)** section. You will use:

- **API Key**, sent as the `X-Api-Key` header.
- **API Secret**, sent as the `X-Api-Secret` header.

See [Authentication](/rest-api/authentication/) for detail on the credentials and rotating the secret.

## 3. Make your first request

```bash
curl https://stamp.appydesign.io/rest_api/v1/shop \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET"
```

A successful response is wrapped in the standard envelope:

```json
{
  "success": true,
  "data": {
    "programName": "Loyalty Rewards",
    "currencySymbol": "$"
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

Next, browse the [Endpoints](/rest-api/endpoints/shop/), or read the [Overview](/rest-api/overview/) for conventions like the response envelope, pagination, and rate limiting.
