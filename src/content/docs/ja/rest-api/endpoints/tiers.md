---
title: VIP ティア
sidebar:
  order: 4
description: REST API で VIP ティアを一覧・取得します。
---

プログラムの VIP ティアとそのマイルストーンです。

## ティアを一覧する

`GET /tiers`

```json
[
  {
    "id": "3",
    "name": "Gold",
    "milestone": 500,
    "multiplier": 2,
    "iconUrl": "https://...",
    "benefits": "...",
    "rewards": [
      {
        "id": "44",
        "name": "$5 off",
        "price": 10,
        "exchangeType": "stamps",
        "iconUrl": "https://..."
      }
    ]
  }
]
```

### ティアのフィールド

一覧エンドポイントと単一ティアエンドポイントの両方が、これらのフィールドを持つオブジェクトを返します。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `name` | string | 表示名。 |
| `milestone` | integer | ティアに到達するために必要なスタンプ数。 |
| `multiplier` | number | メンバーのスタンプ獲得乗数。 |
| `iconUrl` | string | 設定されている場合のアイコン URL（未設定の場合は省略）。 |
| `benefits` | string | ティアの特典の説明。 |
| `rewards` | array | このティアで付与される報酬商品。各オブジェクトは `id`、`name`、`price`、`exchangeType`、`iconUrl` を持ちます。 |

## ティアを取得する

`GET /tiers/{id}`

単一のティア（[ティアのフィールド](#ティアのフィールド)を参照）を返すか、`404 TIER_NOT_FOUND` を返します。
