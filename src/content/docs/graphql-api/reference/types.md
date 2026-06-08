---
title: Types
sidebar:
  order: 3
description: Every object type and scalar in the Appy Stamp GraphQL schema, with field descriptions.
---

The object types and scalars returned by the schema.

## Shop

Shop-level configuration for the loyalty program.

```graphql
type Shop {
  programName: String
  stampBrandingPlural: String
  stampCardValue: Int
  currency: String
  currencySymbol: String
}
```

| Field | Type | Description |
|-------|------|-------------|
| `programName` | `String` | The loyalty program's display name. |
| `stampBrandingPlural` | `String` | The merchant's plural noun for stamps (e.g. "stamps", "beans"). |
| `stampCardValue` | `Int` | Number of stamps that make up one stamp card. |
| `currency` | `String` | ISO currency code. |
| `currencySymbol` | `String` | Display currency symbol. |

## EarnRule

A way customers can earn stamps.

```graphql
type EarnRule {
  id: ID!
  name: String
  type: String
  step: Int
  multiplier: Float
  iconUrl: String
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `type` | `String` | Rule type (e.g. order, social, birthday). |
| `step` | `Int` | Base stamps awarded per qualifying action. |
| `multiplier` | `Float` | Multiplier applied to step. |
| `iconUrl` | `String` | Icon URL if set. |

## Reward

Something customers can redeem stamps for.

```graphql
type Reward {
  id: ID!
  name: String
  price: Int
  exchangeType: String
  iconUrl: String
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Display name (branded/translated). |
| `price` | `Int` | Cost in stamps. |
| `exchangeType` | `String` | How the reward is exchanged. |
| `iconUrl` | `String` | Icon URL if set. |

## Tier

A VIP tier in the loyalty program.

```graphql
type Tier {
  id: ID!
  name: String
  milestone: Int
  multiplier: Float
  iconUrl: String
  benefits: String
  rewards: [Reward!]!
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Tier name. |
| `milestone` | `Int` | Stamps required to reach the tier. |
| `multiplier` | `Float` | Stamp-earning multiplier for members. |
| `iconUrl` | `String` | Icon URL. |
| `benefits` | `String` | Description of the tier's benefits. |
| `rewards` | `[Reward!]!` | Reward products granted by this tier. |

## Beacon

An announcement shown to customers.

```graphql
type Beacon {
  id: ID!
  name: String
  message: String
  icon: String
  active: Boolean
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Beacon name. |
| `message` | `String` | Announcement text shown to customers. |
| `icon` | `String` | Icon identifier. |
| `active` | `Boolean` | Whether currently active. |

## Customer

A loyalty member, identified everywhere by their Shopify customer ID.

```graphql
type Customer {
  id: ID!
  firstName: String
  lastName: String
  email: String
  stampBalance: Int
  cards: Int
  stampsToNextReward: Int
  stampsExpireAt: String
  vipTierId: Int
  vipTierName: String
  dateOfBirth: String
  state: String
  mergedIntoCustomerId: Int
  nextReward: NextReward
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | The Shopify customer ID (the customer's identity everywhere). |
| `firstName` | `String` | The customer's first name. |
| `lastName` | `String` | The customer's last name. |
| `email` | `String` | The customer's email address. |
| `stampBalance` | `Int` | Current redeemable stamp balance. |
| `cards` | `Int` | Number of completed stamp cards. |
| `stampsToNextReward` | `Int` | Stamps still needed to reach the next reward. |
| `stampsExpireAt` | `String` | When the current stamp balance expires, if stamp expiry is enabled. |
| `vipTierId` | `Int` | Current VIP tier ID (if any). |
| `vipTierName` | `String` | Current VIP tier name. |
| `dateOfBirth` | `String` | "dd-mm" string. |
| `state` | `String` | Loyalty state of the customer. |
| `mergedIntoCustomerId` | `Int` | If the customer was merged, the kept customer's ID. |
| `nextReward` | `NextReward` | The next reward the customer is working towards. Populated only when fetching a single customer. |

## NextReward

The reward a customer is closest to earning.

```graphql
type NextReward {
  id: ID!
  name: String
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | The reward's identifier. |
| `name` | `String` | The reward's display name. |

## Activity

A single entry in a customer's stamp ledger.

```graphql
type Activity {
  id: ID!
  label: String
  stampChange: Int
  createdAt: DateTime
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `label` | `String` | Human-readable description of the activity. |
| `stampChange` | `Int` | Stamps added or removed (negative for deductions). |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

## RewardCode

A discount code issued to a customer for a reward.

```graphql
type RewardCode {
  id: ID!
  name: String
  code: String
  used: Boolean
  createdAt: DateTime
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier. |
| `name` | `String` | Reward name. |
| `code` | `String` | The discount code. |
| `used` | `Boolean` | Whether it has been used. |
| `createdAt` | `DateTime` | ISO-8601 timestamp. |

## StampResult

The outcome of a stamp-changing mutation (`awardStamps`, `adjustStamps`, `processActivity`).

```graphql
type StampResult {
  customerId: ID!
  stampChange: Int!
  stampBalance: Int!
}
```

| Field | Type | Description |
|-------|------|-------------|
| `customerId` | `ID!` | The affected customer's ID. |
| `stampChange` | `Int!` | The stamp change applied. |
| `stampBalance` | `Int!` | Resulting stamp balance. |

## Redemption

The outcome of a `redeemReward` mutation.

```graphql
type Redemption {
  code: String
  name: String
  stampBalance: Int!
}
```

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | The issued discount code. |
| `name` | `String` | Reward name. |
| `stampBalance` | `Int!` | Resulting stamp balance after deduction. |

## CustomerConnection

A cursor-paginated page of customers.

```graphql
type CustomerConnection {
  items: [Customer!]!
  pageInfo: PageInfo!
}
```

| Field | Type | Description |
|-------|------|-------------|
| `items` | `[Customer!]!` | The records for this page. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |

## ActivityConnection

A cursor-paginated page of activities.

```graphql
type ActivityConnection {
  items: [Activity!]!
  pageInfo: PageInfo!
}
```

| Field | Type | Description |
|-------|------|-------------|
| `items` | `[Activity!]!` | The records for this page. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |

## PageInfo

Pagination metadata returned by every connection.

```graphql
type PageInfo {
  hasNext: Boolean!
  hasPrevious: Boolean!
  nextCursor: String
  previousCursor: String
  count: Int
}
```

| Field | Type | Description |
|-------|------|-------------|
| `hasNext` | `Boolean!` | Whether another page follows. |
| `hasPrevious` | `Boolean!` | Whether a previous page exists. |
| `nextCursor` | `String` | Cursor to fetch the next page (pass as `after`). |
| `previousCursor` | `String` | Cursor for the previous page (pass as `before`). |
| `count` | `Int` | Total matching records (only when `hasCount: true`, otherwise null). |

## Scalars

```graphql
scalar DateTime
```

| Scalar | Description |
|--------|-------------|
| `DateTime` | An ISO-8601 timestamp string. |
