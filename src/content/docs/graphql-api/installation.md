---
title: Installation
sidebar:
  order: 2
description: "Get access to the GraphQL API and run your first query."
---

## 1. Request access

The GraphQL API is in closed beta and runs on paid plans. [Contact us](https://appydesign.co.uk/contact) to enable it for your store.

## 2. Get your credentials

In **Settings → Developers**, open the **API Access (REST & GraphQL)** section. REST and GraphQL share the same **API Key** and **API Secret**. See [Authentication](/graphql-api/authentication/).

## 3. Run your first query

```bash
curl -X POST https://stamp.appydesign.io/graphql \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ shop { programName currencySymbol } }"}'
```

The schema is introspectable, so GraphQL clients and code generators (GraphiQL, Apollo, Insomnia) discover types automatically once you point them at the endpoint with your headers.

Next, see the [Schema reference](/graphql-api/reference/queries/shop/).
