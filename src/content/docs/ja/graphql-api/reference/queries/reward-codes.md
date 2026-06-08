---
title: リワードコード
sidebar:
  order: 8
description: "rewardCodesクエリ: 顧客に発行された割引コードを一覧する。"
---

## `rewardCodes`

顧客に発行されたリワード（割引）コードを返します。`available: true`を渡すと、まだ使用されていないコードのみを返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `available` | `Boolean` | No | trueの場合、未使用のリワードコードのみを返します。 |

null非許容の[`RewardCode`](/ja/graphql-api/reference/types/)オブジェクトのnull非許容リスト（`[RewardCode!]!`）を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | リワード名。 |
| `code` | `String` | 割引コード。 |
| `used` | `Boolean` | 使用済みかどうか。 |
| `createdAt` | `DateTime` | ISO-8601タイムスタンプ。 |

### 例

```graphql
query ($id: ID!) {
  rewardCodes(customerId: $id, available: true) {
    id
    name
    code
    used
    createdAt
  }
}
```

```json
{
  "data": {
    "rewardCodes": [
      {
        "id": "551",
        "name": "Free coffee",
        "code": "LOYAL-7Q2X",
        "used": false,
        "createdAt": "2026-06-02T09:00:00Z"
      }
    ]
  }
}
```
