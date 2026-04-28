---
title: Introduction
sidebar:
  order: 1
description: What the Appy Stamp SDK is and what you can build with it.
---

The Appy Stamp JavaScript SDK gives developers programmatic access to loyalty program data on any website. Use it to build custom loyalty landing pages, headless storefronts, or integrate stamp and reward data into your own frontend.

The SDK is a lightweight standalone script (under 3KB) with no dependencies. It works on any platform, not just Shopify.

## What you can do

**Without customer login (public data):**
- Fetch shop settings (program name, stamp branding, currency)
- List earning rules (how customers earn stamps)
- List available rewards
- List VIP tier definitions
- List active beacons

**With customer login (authenticated):**
- Get a customer's stamp balance, VIP tier, and next reward
- Browse their activity history (paginated)
- List their earned reward codes
- Redeem a reward and get a discount code back
- Trigger activities (social follows, reviews)
- Update their date of birth

## How it works

1. You add a config object and script tag to your page
2. The SDK loads, fetches shop settings, and optionally authenticates the customer
3. You call methods on `window.appyStamp` to get data and perform actions
4. All methods return Promises

## Next steps

Head to [Installation](/getting-started/installation) to add the SDK to your site.
