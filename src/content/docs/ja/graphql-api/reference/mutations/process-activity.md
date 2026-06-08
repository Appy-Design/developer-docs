---
title: アクティビティの処理
sidebar:
  order: 4
description: "processActivity ミューテーション: 顧客に対して獲得ルールを実行し、そのスタンプを付与します。"
---

## `processActivity(customerId, earnRuleId)`

顧客に対して獲得ルールを実行し、そのルールが付与するスタンプ（ステップ × 乗数）を付与してアクティビティを記録します。生の数値を指定するのではなく、プログラムに設定された獲得ロジックに数量を判断させたい場合に使用します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `earnRuleId` | `ID!` | Yes | 処理する獲得ルール。 |

適用された変更と結果の残高を表す、null非許容の [`StampResult`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `customerId` | `ID!` | 対象顧客のID。 |
| `stampChange` | `Int!` | 適用されたスタンプの変更量。 |
| `stampBalance` | `Int!` | 結果のスタンプ残高。 |

### 例

```graphql
mutation {
  processActivity(customerId: "6677889900", earnRuleId: "12") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "processActivity": {
      "customerId": "6677889900",
      "stampChange": 1,
      "stampBalance": 41
    }
  }
}
```

ルールを適用できなかった場合は、メッセージ `ACTIVITY_NOT_AWARDED` のエラーを返します。
