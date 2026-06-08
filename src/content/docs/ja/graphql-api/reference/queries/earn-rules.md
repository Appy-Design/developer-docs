---
title: 獲得ルール
sidebar:
  order: 2
description: "earnRulesおよびearnRuleクエリ: 顧客がスタンプを獲得する方法を一覧または取得する。"
---

## `earnRules`

ショップに設定されたすべての獲得ルール（顧客がスタンプを獲得する方法。注文、ソーシャルアクション、誕生日など）を返します。引数を取りません。

null非許容の[`EarnRule`](/ja/graphql-api/reference/types/)オブジェクトのnull非許容リスト（`[EarnRule!]!`）を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド付き/翻訳済み）。 |
| `type` | `String` | ルールタイプ（例: order、social、birthday）。 |
| `step` | `Int` | 対象アクションごとに付与される基本スタンプ数。 |
| `multiplier` | `Float` | stepに適用される乗数。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

### 例

```graphql
query {
  earnRules {
    id
    name
    type
    step
    multiplier
    iconUrl
  }
}
```

```json
{
  "data": {
    "earnRules": [
      {
        "id": "12",
        "name": "Place an order",
        "type": "order",
        "step": 1,
        "multiplier": 1.0,
        "iconUrl": "https://cdn.appydesign.io/icons/order.svg"
      }
    ]
  }
}
```

## `earnRule(id)`

IDで単一の獲得ルールを返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | レコードのID。 |

[`EarnRule`](/ja/graphql-api/reference/types/)オブジェクトを返します（nullable、見つからない場合は`null`）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド付き/翻訳済み）。 |
| `type` | `String` | ルールタイプ（例: order、social、birthday）。 |
| `step` | `Int` | 対象アクションごとに付与される基本スタンプ数。 |
| `multiplier` | `Float` | stepに適用される乗数。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

### 例

```graphql
query ($id: ID!) {
  earnRule(id: $id) {
    id
    name
    type
    step
    multiplier
  }
}
```

```json
{
  "data": {
    "earnRule": {
      "id": "12",
      "name": "Place an order",
      "type": "order",
      "step": 1,
      "multiplier": 1.0
    }
  }
}
```
