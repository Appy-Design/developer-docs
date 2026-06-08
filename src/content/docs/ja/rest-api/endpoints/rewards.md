---
title: リワード
sidebar:
  order: 3
description: REST API で交換可能なリワード商品を一覧・取得します。
---

交換可能なリワード商品です（POS 限定および VIP ティアでロックされたリワードを除く）。

## リワードを一覧する

`GET /rewards`

```json
[
  {
    "id": "44",
    "name": "$5 off",
    "price": 10,
    "exchangeType": "stamps",
    "iconUrl": "https://..."
  }
]
```

`price` はスタンプでのコストです。

### リワードのフィールド

一覧エンドポイントと単一リワードエンドポイントの両方が、これらのフィールドを持つオブジェクトを返します。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `name` | string | 表示名。 |
| `price` | integer | スタンプでのコスト。 |
| `exchangeType` | string | リワードの交換方法。 |
| `iconUrl` | string | 設定されている場合のアイコン URL（未設定の場合は省略）。 |

## リワードを取得する

`GET /rewards/{id}`

単一のリワード（[リワードのフィールド](#リワードのフィールド)を参照）を返すか、`404 REWARD_NOT_FOUND` を返します。
