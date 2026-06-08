---
title: REST API Overview
sidebar:
  order: 1
description: "Server-to-server REST access to the Appy Stamp loyalty engine: authentication, conventions, and error handling."
---

The Appy Stamp REST API is a **server-to-server** interface for reading and updating loyalty data from your own backend, CRM, or automation tooling. Unlike the [JavaScript SDK](/getting-started/introduction/) (which runs in the browser and is scoped to a single logged-in customer), the REST API authenticates as the **merchant** and can act on any customer in your shop.

The REST and [GraphQL](/graphql-api/overview/) APIs expose the same loyalty data and capabilities, so you can pick whichever fits your stack.

:::caution[Closed beta]
The REST & GraphQL API is currently in **closed beta**. It must be enabled for your store before your credentials will work. [Contact us](https://appydesign.co.uk/contact) to request access.
:::

## Base URL

```
https://stamp.appydesign.io/rest_api/v1
```

All endpoints are under the `/rest_api/v1` prefix.

## Authentication

Requests authenticate as the merchant with the `X-Api-Key` and `X-Api-Secret` headers. See [Authentication](/rest-api/authentication/) for the credentials and how to rotate the secret, and [Installation](/rest-api/installation/) to make your first request.

## Response envelope

Every successful response is wrapped in a consistent envelope:

```json
{
  "success": true,
  "data": { },
  "meta": { },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

| Field | Description |
|-------|-------------|
| `success` | `true` for 2xx responses, `false` for errors |
| `data` | The resource, or an array of resources for list endpoints |
| `meta` | Present on list endpoints; holds `pagination` and `count` |
| `timestamp` | ISO-8601 server time |

Fields with `null` values are **omitted** from `data` to keep payloads compact.

## Errors

Errors use the same envelope with an `error` object:

```json
{
  "success": false,
  "error": {
    "message": "Customer not found",
    "code": "CUSTOMER_NOT_FOUND",
    "statusCode": 404
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

| Code | HTTP | Meaning |
|------|------|---------|
| `UNAUTHORIZED` | 401 | Missing or invalid API credentials |
| `API_ACCESS_DISABLED` | 403 | The developer API is not enabled for your store (closed beta) |
| `PLAN_UPGRADE_REQUIRED` | 403 | The developer API requires a paid plan |
| `VALIDATION_ERROR` | 422 | Request body failed validation |
| `CUSTOMER_NOT_FOUND` | 404 | No such customer in your shop |
| `REWARD_NOT_FOUND` | 404 | No such reward in your shop |
| `EARN_RULE_NOT_FOUND` | 404 | No such earn rule in your shop |
| `TIER_NOT_FOUND` | 404 | No such VIP tier in your shop |
| `INSUFFICIENT_STAMPS` | 422 | Customer does not have enough stamps to redeem |
| `ACTIVITY_NOT_AWARDED` | 422 | Earn rule could not be awarded (e.g. rate-limited or ineligible) |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## Pagination

List endpoints that can grow large (`/customers`, `/customers/{id}/activities`) use **cursor-based** pagination:

| Query param | Description |
|-------------|-------------|
| `limit` | Page size (default `20`, max `1000`) |
| `after` | Cursor for the next page (pass `meta.pagination.nextCursor`) |
| `before` | Cursor for the previous page |
| `hasCount` | Set to `true` to include the total `count` (slower) |

The cursor lives in `meta.pagination`:

```json
{
  "success": true,
  "data": [ /* ...items... */ ],
  "meta": {
    "pagination": {
      "hasNext": true,
      "hasPrevious": false,
      "nextCursor": "aWQ6MTAx",
      "previousCursor": "aWQ6MQ==",
      "count": null
    }
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

To walk forward, keep passing the previous response's `nextCursor` as `after` until `hasNext` is `false`. Smaller reference lists (`/earn-rules`, `/rewards`, `/tiers`, `/beacons`, reward codes) are returned in full with a `meta.count`.

## Rate limiting

Requests are limited to **1000 per hour per shop**. Every response includes:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Your hourly quota |
| `X-RateLimit-Remaining` | Requests remaining in the current window |

Exceeding the limit returns `429` with the `RATE_LIMITED` code.

## Next steps

See the [Endpoints reference](/rest-api/endpoints/shop/) for every resource, or the [GraphQL API](/graphql-api/overview/) if you prefer a typed, single-endpoint interface over the same data.
