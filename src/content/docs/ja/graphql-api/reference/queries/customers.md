---
title: 顧客
sidebar:
  order: 6
description: "customersおよびcustomerクエリ: ロイヤリティメンバーをページ送りするか、Shopify IDで1人を取得する。"
---

## `customers`

ショップのロイヤリティ顧客の、カーソルベースでページネーションされた1ページを返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `email` | `String` | No | このメールアドレスを持つ顧客のみを返します。 |
| `limit` | `Int` | No | ページサイズ、1〜1000、デフォルト20。 |
| `after` | `String` | No | 次のページのカーソル。 |
| `before` | `String` | No | 前のページのカーソル。 |
| `hasCount` | `Boolean` | No | 合計`count`を含めるにはtrueを設定（低速）。 |

1つのメールアドレスは複数の顧客に属することがあるため、`email`でフィルタすると複数の顧客が返ることがあります。顧客の識別子は常にShopify顧客IDであり、メールアドレスではありません。

null非許容の[`CustomerConnection`](/ja/graphql-api/reference/types/)を返します。これはページの`items`とその`pageInfo`をラップします。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `items` | `[Customer!]!` | このページのレコード。 |
| `pageInfo` | `PageInfo!` | ページネーションのメタデータ（下記参照）。 |

各アイテムは[`Customer`](/ja/graphql-api/reference/types/)です。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | Shopify顧客ID（あらゆる場所での顧客の識別子）。 |
| `firstName` | `String` | 顧客の名。 |
| `lastName` | `String` | 顧客の姓。 |
| `email` | `String` | 顧客のメールアドレス。 |
| `stampBalance` | `Int` | 現在の引き換え可能なスタンプ残高。 |
| `cards` | `Int` | 完了したスタンプカードの枚数。 |
| `stampsToNextReward` | `Int` | 次のリワードに到達するまでに必要な残りのスタンプ数。 |
| `stampsExpireAt` | `String` | スタンプの有効期限が有効な場合に、現在のスタンプ残高が失効する日時。 |
| `vipTierId` | `Int` | 現在のVIPティアID（ある場合）。 |
| `vipTierName` | `String` | 現在のVIPティア名。 |
| `dateOfBirth` | `String` | "dd-mm"形式の文字列。 |
| `state` | `String` | 顧客のロイヤリティ状態。 |
| `mergedIntoCustomerId` | `Int` | 顧客がマージされた場合、保持された顧客のID。 |

`nextReward`は一覧クエリでは`null`です。値を取得するには単一の顧客を取得してください（顧客ごとのクエリを実行するため、N+1の処理を避ける目的で一覧ではスキップされます）。

`pageInfo`フィールドは[`PageInfo`](/ja/graphql-api/reference/types/)です。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `hasNext` | `Boolean!` | 次のページが続くかどうか。 |
| `hasPrevious` | `Boolean!` | 前のページが存在するかどうか。 |
| `nextCursor` | `String` | 次のページを取得するためのカーソル（`after`として渡す）。 |
| `previousCursor` | `String` | 前のページのカーソル（`before`として渡す）。 |
| `count` | `Int` | 一致するレコードの合計（`hasCount: true`の場合のみ、それ以外はnull）。 |

### 例

```graphql
query ($after: String) {
  customers(limit: 50, after: $after) {
    items { id firstName stampBalance }
    pageInfo { hasNext nextCursor }
  }
}
```

```json
{
  "data": {
    "customers": {
      "items": [
        {
          "id": "6677889900",
          "firstName": "Ada",
          "stampBalance": 35
        }
      ],
      "pageInfo": {
        "hasNext": true,
        "nextCursor": "eyJpZCI6NjY3Nzg4OTkwMH0="
      }
    }
  }
}
```

返された`nextCursor`を`$after`として渡し、`hasNext`が`false`になるまで繰り返します。

## `customer(id)`

Shopify顧客IDで単一の顧客を返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | Shopify顧客ID。 |

[`Customer`](/ja/graphql-api/reference/types/)オブジェクトを返します（nullable、見つからない場合は`null`）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | Shopify顧客ID（あらゆる場所での顧客の識別子）。 |
| `firstName` | `String` | 顧客の名。 |
| `lastName` | `String` | 顧客の姓。 |
| `email` | `String` | 顧客のメールアドレス。 |
| `stampBalance` | `Int` | 現在の引き換え可能なスタンプ残高。 |
| `cards` | `Int` | 完了したスタンプカードの枚数。 |
| `stampsToNextReward` | `Int` | 次のリワードに到達するまでに必要な残りのスタンプ数。 |
| `stampsExpireAt` | `String` | スタンプの有効期限が有効な場合に、現在のスタンプ残高が失効する日時。 |
| `vipTierId` | `Int` | 現在のVIPティアID（ある場合）。 |
| `vipTierName` | `String` | 現在のVIPティア名。 |
| `dateOfBirth` | `String` | "dd-mm"形式の文字列。 |
| `state` | `String` | 顧客のロイヤリティ状態。 |
| `mergedIntoCustomerId` | `Int` | 顧客がマージされた場合、保持された顧客のID。 |
| `nextReward` | [`NextReward`](/ja/graphql-api/reference/types/) | 顧客が次に目指しているリワード（`id`と`name`）。 |

### 例

```graphql
query ($id: ID!) {
  customer(id: $id) {
    id
    firstName
    lastName
    email
    stampBalance
    cards
    stampsToNextReward
    vipTierName
    nextReward { id name }
  }
}
```

```json
{
  "data": {
    "customer": {
      "id": "6677889900",
      "firstName": "Ada",
      "lastName": "Lovelace",
      "email": "ada@example.com",
      "stampBalance": 35,
      "cards": 1,
      "stampsToNextReward": 5,
      "vipTierName": "Gold",
      "nextReward": { "id": "44", "name": "Free coffee" }
    }
  }
}
```
