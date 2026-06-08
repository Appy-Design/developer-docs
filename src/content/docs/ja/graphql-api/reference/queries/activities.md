---
title: アクティビティ
sidebar:
  order: 7
description: "customerActivitiesクエリ: 顧客のロイヤリティ台帳をページ送りする。"
---

## `customerActivities`

顧客のロイヤリティアクティビティ（スタンプ台帳）の、カーソルベースでページネーションされた1ページを、新しい順に返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `limit` | `Int` | No | ページサイズ、1〜1000、デフォルト20。 |
| `after` | `String` | No | 次のページのカーソル。 |
| `hasCount` | `Boolean` | No | 合計`count`を含めるにはtrueを設定（低速）。 |

null非許容の[`ActivityConnection`](/ja/graphql-api/reference/types/)を返します。これはページの`items`とその`pageInfo`をラップします。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `items` | `[Activity!]!` | このページのレコード。 |
| `pageInfo` | `PageInfo!` | ページネーションのメタデータ（下記参照）。 |

各アイテムは[`Activity`](/ja/graphql-api/reference/types/)です。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `label` | `String` | アクティビティの人間が読める説明。 |
| `stampChange` | `Int` | 追加または削除されたスタンプ（控除の場合は負の値）。 |
| `createdAt` | `DateTime` | ISO-8601タイムスタンプ。 |

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
query ($id: ID!) {
  customerActivities(customerId: $id, limit: 20) {
    items { id label stampChange createdAt }
    pageInfo { hasNext nextCursor }
  }
}
```

```json
{
  "data": {
    "customerActivities": {
      "items": [
        {
          "id": "98123",
          "label": "Placed an order",
          "stampChange": 3,
          "createdAt": "2026-06-01T10:15:00Z"
        }
      ],
      "pageInfo": {
        "hasNext": true,
        "nextCursor": "eyJpZCI6OTgxMjN9"
      }
    }
  }
}
```

返された`nextCursor`を`$after`として渡し、`hasNext`が`false`になるまで繰り返します。
