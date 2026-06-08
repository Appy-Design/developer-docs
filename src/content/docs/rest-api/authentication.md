---
title: Authentication
sidebar:
  order: 3
description: "Authenticate REST requests with your shop's API key and secret."
---

Every request authenticates as the merchant using two headers:

| Header | Value |
|--------|-------|
| `X-Api-Key` | Your shop's API Key |
| `X-Api-Secret` | Your shop's API Secret |
| `Content-Type` | `application/json` |

```bash
curl https://stamp.appydesign.io/rest_api/v1/shop \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET"
```

## Where to find your credentials

Open **Settings → Developers** in your Appy Stamp admin and look in the **API Access (REST & GraphQL)** section.

- **API Key**: your shop's public identifier. It is stable and rarely changes.
- **API Secret**: keep it server-side and never expose it in client code. For browser and storefront use cases, use the [JavaScript SDK](/sdk/installation/) instead. You can rotate the secret at any time from that screen. Rotating immediately invalidates the old secret, so update your integrations when you do. The secret is independent of your SDK keys.

REST and GraphQL share the same credentials.

## Failed authentication

A missing or invalid credential returns `401`:

```json
{
  "success": false,
  "error": {
    "message": "Invalid API credentials",
    "code": "UNAUTHORIZED",
    "statusCode": 401
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

A store that is not in the closed beta returns `403` with `API_ACCESS_DISABLED`. A store on the free plan returns `403` with `PLAN_UPGRADE_REQUIRED`.
