---
title: リワード
sidebar:
  order: 3
description: "rewardsおよびrewardクエリ: 顧客が引き換え可能なリワードを一覧または取得する。"
---

## `rewards`

ショップに設定されたすべてのリワード（顧客がスタンプと引き換えられるもの）を返します。引数を取りません。

null非許容の[`Reward`](/ja/graphql-api/reference/types/)オブジェクトのnull非許容リスト（`[Reward!]!`）を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド付き/翻訳済み）。 |
| `price` | `Int` | スタンプでのコスト。 |
| `exchangeType` | `String` | リワードの引き換え方法。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

### 例

```graphql
query {
  rewards {
    id
    name
    price
    exchangeType
    iconUrl
  }
}
```

```json
{
  "data": {
    "rewards": [
      {
        "id": "44",
        "name": "Free coffee",
        "price": 10,
        "exchangeType": "free_product",
        "iconUrl": "https://cdn.appydesign.io/icons/coffee.svg"
      }
    ]
  }
}
```

## `reward(id)`

IDで単一のリワードを返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | レコードのID。 |

[`Reward`](/ja/graphql-api/reference/types/)オブジェクトを返します（nullable、見つからない場合は`null`）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | 表示名（ブランド付き/翻訳済み）。 |
| `price` | `Int` | スタンプでのコスト。 |
| `exchangeType` | `String` | リワードの引き換え方法。 |
| `iconUrl` | `String` | 設定されている場合のアイコンURL。 |

### 例

```graphql
query ($id: ID!) {
  reward(id: $id) {
    id
    name
    price
    exchangeType
  }
}
```

```json
{
  "data": {
    "reward": {
      "id": "44",
      "name": "Free coffee",
      "price": 10,
      "exchangeType": "free_product"
    }
  }
}
```
