---
title: リワードの付与
sidebar:
  order: 6
description: "grantReward ミューテーション: スタンプを消費せずに顧客へリワードを無償提供します。"
---

## `grantReward(customerId, rewardProductId, variableAmount)`

スタンプを一切差し引かずに顧客へリワードを付与（無償提供）し、実際のディスカウントコードを発行します。好意による提供や手動での無償提供に使用します。[`redeemReward`](/ja/graphql-api/reference/mutations/redeem-reward/) と同様ですが、スタンプ残高はそのまま維持されます。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `rewardProductId` | `ID!` | Yes | 付与するリワード。 |
| `variableAmount` | `Int` | No | 変動値リワードの値。 |

発行されたコードと顧客の（変化していない）残高を保持する、null非許容の [`Redemption`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|------|------|-------------|
| `code` | `String` | 発行された割引コード。 |
| `name` | `String` | リワード名。 |
| `stampBalance` | `Int!` | 顧客のスタンプ残高（スタンプを消費していないため変化なし）。 |

### 例

```graphql
mutation {
  grantReward(customerId: "6677889900", rewardProductId: "44") {
    code
    name
    stampBalance
  }
}
```

```json
{
  "data": {
    "grantReward": {
      "code": "APPY-7Q2X",
      "name": "Free coffee",
      "stampBalance": 35
    }
  }
}
```

リワードが存在しない場合はメッセージ `REWARD_NOT_FOUND` のエラーを、不明な顧客の場合は `CUSTOMER_NOT_FOUND` のエラーを返します。
