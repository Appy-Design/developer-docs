---
title: Authentication
sidebar:
  order: 3
description: "Authenticate GraphQL requests with your shop's API key and secret."
---

Authenticate as the merchant with two headers. These are the same credentials as the REST API:

| Header | Value |
|--------|-------|
| `X-Api-Key` | Your shop's API Key |
| `X-Api-Secret` | Your shop's API Secret |
| `Content-Type` | `application/json` |

## Where to find your credentials

Open **Settings → Developers** and look in the **API Access (REST & GraphQL)** section. The API Key is your shop's stable public identifier. The API Secret is rotatable from that screen and must be kept server-side. A secret you rotate applies to both REST and GraphQL. The API Secret is independent of your SDK keys.

## Failed authentication

Missing or invalid credentials, a store outside the closed beta, or a store on the free plan return an error in the `errors` array (for example `UNAUTHORIZED`, `API_ACCESS_DISABLED`, or `PLAN_UPGRADE_REQUIRED`).
