---
title: スタンプの付与
sidebar:
  order: 2
description: "awardStamps ミューテーション: 顧客の残高にスタンプを追加します。"
---

## `awardStamps(customerId, stamps, comment, internalComment)`

顧客の残高にスタンプを追加し、ロイヤルティアクティビティを記録します。ボーナスなどの正の付与に使用します。スタンプを差し引いたり任意の補正を行ったりする場合は、代わりに [`adjustStamps`](/ja/graphql-api/reference/mutations/adjust-stamps/) を使用してください。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `stamps` | `Int!` | Yes | 付与するスタンプ数（1以上である必要があります）。 |
| `comment` | `String` | No | アクティビティに表示される顧客向けのメモ。省略した場合は、ストアのブランド化された手動調整ラベルが既定値になります。 |
| `internalComment` | `String` | No | スタッフのみが閲覧でき、顧客には表示されないメモ。省略した場合は「API adjustment」が既定値になります。 |

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
  awardStamps(customerId: "6677889900", stamps: 5, comment: "Birthday bonus", internalComment: "Awarded via API") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "awardStamps": {
      "customerId": "6677889900",
      "stampChange": 5,
      "stampBalance": 40
    }
  }
}
```
