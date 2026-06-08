---
title: スタンプの調整
sidebar:
  order: 3
description: "adjustStamps ミューテーション: 正または負の任意のスタンプ補正を適用します。"
---

## `adjustStamps(customerId, stamps, comment, internalComment)`

顧客の残高に任意のスタンプ補正を適用し、ロイヤルティアクティビティを記録します。[`awardStamps`](/ja/graphql-api/reference/mutations/award-stamps/) とは異なり、スタンプを差し引くために負の値を指定できます。値はゼロ以外である必要があります。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `stamps` | `Int!` | Yes | 適用するスタンプ数（ゼロ以外の任意の値。負の値で差し引き）。 |
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
  adjustStamps(customerId: "6677889900", stamps: -3, comment: "Correction", internalComment: "Stock count fix") {
    customerId
    stampChange
    stampBalance
  }
}
```

```json
{
  "data": {
    "adjustStamps": {
      "customerId": "6677889900",
      "stampChange": -3,
      "stampBalance": 37
    }
  }
}
```
