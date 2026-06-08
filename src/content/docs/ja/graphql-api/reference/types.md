---
title: 型
sidebar:
  order: 3
description: Appy Stamp GraphQLスキーマのすべてのオブジェクト型とスカラーを、フィールドの説明とともに掲載します。
---

スキーマが返すオブジェクト型とスカラーです。

## Shop

ロイヤルティプログラムのショップレベルの設定です。

```graphql
type Shop {
  programName: String
  stampBrandingPlural: String
  stampCardValue: Int
  currency: String
  currencySymbol: String
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `programName` | `String` | ロイヤルティプログラムの表示名。 |
| `stampBrandingPlural` | `String` | マーチャントがスタンプを表す複数形の名詞（例: "stamps", "beans"）。 |
| `stampCardValue` | `Int` | 1枚のスタンプカードを構成するスタンプ数。 |
| `currency` | `String` | ISO通貨コード。 |
| `currencySymbol` | `String` | 表示用の通貨記号。 |

## EarnRule

顧客がスタンプを獲得する方法です。

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

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド化/翻訳済み）。 |
| `type` | `String` | ルールタイプ（例: order, social, birthday）。 |
| `step` | `Int` | 対象アクションごとに付与される基本スタンプ数。 |
| `multiplier` | `Float` | ステップに適用される乗数。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

## Reward

顧客がスタンプと引き換えられるものです。

```graphql
type Reward {
  id: ID!
  name: String
  price: Int
  exchangeType: String
  iconUrl: String
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド化/翻訳済み）。 |
| `price` | `Int` | スタンプでのコスト。 |
| `exchangeType` | `String` | リワードの引き換え方法。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

## Tier

ロイヤルティプログラムのVIPティアです。

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

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | ティア名。 |
| `milestone` | `Int` | ティアに到達するために必要なスタンプ数。 |
| `multiplier` | `Float` | メンバーのスタンプ獲得乗数。 |
| `iconUrl` | `String` | アイコンURL。 |
| `benefits` | `String` | ティアの特典の説明。 |
| `rewards` | `[Reward!]!` | このティアで付与される報酬商品。 |

## Beacon

顧客に表示されるお知らせです。

```graphql
type Beacon {
  id: ID!
  name: String
  message: String
  icon: String
  active: Boolean
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | ビーコン名。 |
| `message` | `String` | 顧客に表示されるお知らせのテキスト。 |
| `icon` | `String` | アイコン識別子。 |
| `active` | `Boolean` | 現在有効かどうか。 |

## Customer

ロイヤルティメンバーです。あらゆる場所でShopify顧客IDによって識別されます。

```graphql
type Customer {
  id: ID!
  firstName: String
  lastName: String
  email: String
  stampBalance: Int
  vipTierId: Int
  vipTierName: String
  dateOfBirth: String
  state: String
  mergedIntoCustomerId: Int
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | Shopify顧客ID（あらゆる場所での顧客の識別子）。 |
| `firstName` | `String` | 顧客の名。 |
| `lastName` | `String` | 顧客の姓。 |
| `email` | `String` | 顧客のメールアドレス。 |
| `stampBalance` | `Int` | 現在の利用可能なスタンプ残高。 |
| `vipTierId` | `Int` | 現在のVIPティアID（ある場合）。 |
| `vipTierName` | `String` | 現在のVIPティア名。 |
| `dateOfBirth` | `String` | "dd-mm" 形式の文字列。 |
| `state` | `String` | 顧客のロイヤルティ状態。 |
| `mergedIntoCustomerId` | `Int` | 顧客がマージされた場合、統合先の顧客ID。 |

## Activity

顧客のスタンプ台帳における1件のエントリです。

```graphql
type Activity {
  id: ID!
  label: String
  stampChange: Int
  createdAt: DateTime
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `label` | `String` | アクティビティの人間が読める説明。 |
| `stampChange` | `Int` | 追加または削除されたスタンプ（差し引きの場合は負の値）。 |
| `createdAt` | `DateTime` | ISO-8601 タイムスタンプ。 |

## RewardCode

リワードのために顧客に発行された割引コードです。

```graphql
type RewardCode {
  id: ID!
  name: String
  code: String
  used: Boolean
  createdAt: DateTime
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | リワード名。 |
| `code` | `String` | 割引コード。 |
| `used` | `Boolean` | 使用済みかどうか。 |
| `createdAt` | `DateTime` | ISO-8601 タイムスタンプ。 |

## StampResult

スタンプを変更するミューテーション（`awardStamps`、`adjustStamps`、`processActivity`）の結果です。

```graphql
type StampResult {
  customerId: ID!
  stampChange: Int!
  stampBalance: Int!
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `customerId` | `ID!` | 対象顧客のID。 |
| `stampChange` | `Int!` | 適用されたスタンプの変更量。 |
| `stampBalance` | `Int!` | 結果のスタンプ残高。 |

## Redemption

`redeemReward` ミューテーションの結果です。

```graphql
type Redemption {
  code: String
  name: String
  stampBalance: Int!
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `code` | `String` | 発行された割引コード。 |
| `name` | `String` | リワード名。 |
| `stampBalance` | `Int!` | 差し引き後の結果のスタンプ残高。 |

## CustomerConnection

カーソルページネーションされた顧客の1ページです。

```graphql
type CustomerConnection {
  items: [Customer!]!
  pageInfo: PageInfo!
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `items` | `[Customer!]!` | このページのレコード。 |
| `pageInfo` | `PageInfo!` | ページネーションのメタデータ。 |

## ActivityConnection

カーソルページネーションされたアクティビティの1ページです。

```graphql
type ActivityConnection {
  items: [Activity!]!
  pageInfo: PageInfo!
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `items` | `[Activity!]!` | このページのレコード。 |
| `pageInfo` | `PageInfo!` | ページネーションのメタデータ。 |

## PageInfo

すべてのコネクションが返すページネーションのメタデータです。

```graphql
type PageInfo {
  hasNext: Boolean!
  hasPrevious: Boolean!
  nextCursor: String
  previousCursor: String
  count: Int
}
```

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `hasNext` | `Boolean!` | 次のページがあるかどうか。 |
| `hasPrevious` | `Boolean!` | 前のページがあるかどうか。 |
| `nextCursor` | `String` | 次のページを取得するためのカーソル（`after` として渡します）。 |
| `previousCursor` | `String` | 前のページのカーソル（`before` として渡します）。 |
| `count` | `Int` | 一致するレコードの総数（`hasCount: true` の場合のみ。それ以外は null）。 |

## Scalars

```graphql
scalar DateTime
```

| スカラー | 説明 |
|--------|-------------|
| `DateTime` | ISO-8601 タイムスタンプ文字列。 |
