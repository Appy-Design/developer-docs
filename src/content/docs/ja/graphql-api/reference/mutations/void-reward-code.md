---
title: リワードコードを無効化する
sidebar:
  order: 8
description: "voidRewardCode ミューテーション: コードのスタンプを返却し、Shopify で無効化します。"
---

## `voidRewardCode(customerId, rewardCodeId)`

リワードコードを無効化します。コードに使用されたスタンプが顧客へ返却され、コードは Shopify で無効化されます。交換を取り消す場合に使用します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | コードが属する Shopify顧客ID。 |
| `rewardCodeId` | `ID!` | Yes | 無効化するリワードコード。 |

null非許容の [`RewardCode`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|------|------|-------------|
| `id` | `ID!` | リワードコードの識別子。 |
| `name` | `String` | リワード名。 |
| `code` | `String` | 割引コード。 |
| `used` | `Boolean` | 使用済みかどうか。 |
| `createdAt` | `DateTime` | ISO-8601 タイムスタンプ。 |

### 例

```graphql
mutation {
  voidRewardCode(customerId: "6677889900", rewardCodeId: "501") {
    id
    code
  }
}
```

```json
{
  "data": {
    "voidRewardCode": {
      "id": "501",
      "code": "APPY-5OFF-XXXX"
    }
  }
}
```

コードが顧客に属していない場合はメッセージ `REWARD_CODE_NOT_FOUND` のエラーを、不明な顧客の場合は `CUSTOMER_NOT_FOUND` のエラーを、コードを無効化できない場合は `VOID_FAILED` のエラーを返します。
