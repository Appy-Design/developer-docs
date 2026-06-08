---
title: リワードの引き換え
sidebar:
  order: 5
description: "redeemReward ミューテーション: 顧客のスタンプをリワードに使用し、割引コードを発行します。"
---

## `redeemReward(customerId, rewardProductId, variableAmount)`

顧客のリワードを引き換えます。リワードのスタンプコストを差し引き、割引コードを発行します。変動値のリワードの場合は、`variableAmount` を渡して使用するスタンプ数を設定します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `rewardProductId` | `ID!` | Yes | 引き換えるリワード。 |
| `variableAmount` | `Int` | No | 変動値リワードのスタンプ数。 |

発行されたコードと新しい残高を保持する、null非許容の [`Redemption`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `code` | `String` | 発行された割引コード。 |
| `name` | `String` | リワード名。 |
| `stampBalance` | `Int!` | 差し引き後の結果のスタンプ残高。 |

### 例

```graphql
mutation {
  redeemReward(customerId: "6677889900", rewardProductId: "44") {
    code
    name
    stampBalance
  }
}
```

```json
{
  "data": {
    "redeemReward": {
      "code": "LOYAL-7Q2X",
      "name": "Free coffee",
      "stampBalance": 31
    }
  }
}
```

顧客のスタンプが不足している場合はメッセージ `INSUFFICIENT_STAMPS` のエラーを、リワードが存在しない場合は `REWARD_NOT_FOUND` のエラーを返します。
