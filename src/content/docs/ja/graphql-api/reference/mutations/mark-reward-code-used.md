---
title: リワードコードを使用済みにする
sidebar:
  order: 7
description: "markRewardCodeUsed ミューテーション: コードを使用済みにし、Shopify で無効化します。"
---

## `markRewardCodeUsed(customerId, rewardCodeId)`

リワードコードを使用済みとしてマークします（例: 外部のチェックアウトでディスカウントが適用された後など）。コードは Shopify でも無効化され、それ以降は交換できなくなります。スタンプの返却は行われません。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | コードが属する Shopify顧客ID。 |
| `rewardCodeId` | `ID!` | Yes | 使用済みにするリワードコード。 |

`used` が `true` に設定された、null非許容の [`RewardCode`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|------|------|-------------|
| `id` | `ID!` | リワードコードの識別子。 |
| `name` | `String` | リワード名。 |
| `code` | `String` | 割引コード。 |
| `used` | `Boolean` | 使用済みかどうか（現在は `true`）。 |
| `createdAt` | `DateTime` | ISO-8601 タイムスタンプ。 |

### 例

```graphql
mutation {
  markRewardCodeUsed(customerId: "6677889900", rewardCodeId: "501") {
    id
    code
    used
  }
}
```

```json
{
  "data": {
    "markRewardCodeUsed": {
      "id": "501",
      "code": "APPY-5OFF-XXXX",
      "used": true
    }
  }
}
```

コードが顧客に属していない場合はメッセージ `REWARD_CODE_NOT_FOUND` のエラーを、不明な顧客の場合は `CUSTOMER_NOT_FOUND` のエラーを返します。
