---
title: Introduction
sidebar:
  order: 1
description: "The three ways to build on Appy Stamp: the JavaScript SDK, the REST API, and the GraphQL API."
---

Appy Stamp gives you three ways to build on your loyalty program. Pick the one that fits where your code runs.

## JavaScript SDK

A lightweight browser script (under 3KB, no dependencies) for building custom loyalty UI on your storefront or any website. It is scoped to the logged-in customer, so it suits storefront widgets, custom rewards pages, and headless storefronts. Available on any paid plan.

Start with [SDK Installation](/sdk/installation/).

## REST API

A server-to-server HTTP API that authenticates as the merchant and can act on any customer in your shop. Use it from your backend, CRM, or automation tooling. Currently in closed beta, on paid plans.

Start with the [REST API Overview](/rest-api/overview/).

## GraphQL API

The same data and capabilities as the REST API through a single typed, introspectable endpoint. Fetch exactly the fields you need in one request. Currently in closed beta, on paid plans.

Start with the [GraphQL API Overview](/graphql-api/overview/).

## What you can work with

Across all three integrations you can access:

- Shop settings (program name, stamp branding, currency)
- Earning rules, rewards, and VIP tiers
- Customers, including their stamp balance, VIP tier, and activity history
- Earned reward codes and redemptions
- Awarding and adjusting stamps (REST and GraphQL)
