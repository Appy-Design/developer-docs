---
title: VIPティア
sidebar:
  order: 4
description: "tiersおよびtierクエリ: プログラムのVIPティアを一覧または取得する。"
---

## `tiers`

ショップに設定されたすべてのVIPティアを返します。引数を取りません。

null非許容の[`Tier`](/ja/graphql-api/reference/types/)オブジェクトのnull非許容リスト（`[Tier!]!`）を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | ティア名。 |
| `milestone` | `Int` | ティアに到達するために必要なスタンプ数。 |
| `multiplier` | `Float` | メンバー向けのスタンプ獲得乗数。 |
| `iconUrl` | `String` | アイコンURL。 |
| `benefits` | `String` | ティアの特典の説明。 |
| `rewards` | `[Reward!]!` | このティアで付与される報酬商品。 |

### 例

```graphql
query {
  tiers {
    id
    name
    milestone
    rewards {
      id
      name
      price
    }
  }
}
```

```json
{
  "data": {
    "tiers": [
      {
        "id": "3",
        "name": "Gold",
        "milestone": 100,
        "rewards": [
          {
            "id": "12",
            "name": "Free coffee",
            "price": 50
          }
        ]
      }
    ]
  }
}
```

## `tier(id)`

IDで単一のVIPティアを返します。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | レコードのID。 |

[`Tier`](/ja/graphql-api/reference/types/)オブジェクトを返します（nullable、見つからない場合は`null`）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | ティア名。 |
| `milestone` | `Int` | ティアに到達するために必要なスタンプ数。 |
| `multiplier` | `Float` | メンバー向けのスタンプ獲得乗数。 |
| `iconUrl` | `String` | アイコンURL。 |
| `benefits` | `String` | ティアの特典の説明。 |
| `rewards` | `[Reward!]!` | このティアで付与される報酬商品。 |

### 例

```graphql
query ($id: ID!) {
  tier(id: $id) {
    id
    name
    milestone
    rewards {
      id
      name
      price
    }
  }
}
```

```json
{
  "data": {
    "tier": {
      "id": "3",
      "name": "Gold",
      "milestone": 100,
      "rewards": [
        {
          "id": "12",
          "name": "Free coffee",
          "price": 50
        }
      ]
    }
  }
}
```
