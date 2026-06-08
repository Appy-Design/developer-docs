---
title: 獲得ルール
sidebar:
  order: 2
description: REST API で顧客がスタンプを獲得する方法を一覧・取得します。
---

顧客がスタンプを獲得する方法です。

## 獲得ルールを一覧する

`GET /earn-rules`

```json
[
  {
    "id": "12",
    "name": "Place an order",
    "type": "order",
    "step": 1,
    "multiplier": 1,
    "iconUrl": "https://..."
  }
]
```

### 獲得ルールのフィールド

一覧エンドポイントと単一ルールエンドポイントの両方が、これらのフィールドを持つオブジェクトを返します。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `name` | string | 表示名（ブランド化／翻訳済み）。 |
| `type` | string | ルールの種類（例: `order`、`social`、`birthday`）。 |
| `step` | integer | 条件を満たすアクションごとに付与される基本スタンプ数。 |
| `multiplier` | number | `step` に適用される乗数。 |
| `iconUrl` | string | 設定されている場合のアイコン URL（未設定の場合は省略）。 |

## 獲得ルールを取得する

`GET /earn-rules/{id}`

単一の獲得ルール（[獲得ルールのフィールド](#獲得ルールのフィールド)を参照）を返すか、`404 EARN_RULE_NOT_FOUND` を返します。
