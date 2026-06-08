---
title: リワードコード
sidebar:
  order: 9
description: REST API で顧客が獲得したリワードの履行（ディスカウントコード）を一覧します。
---

顧客が獲得したリワードの履行（ディスカウントコード）です。

顧客の `{id}` はその Shopify 顧客 ID です。

## リワードコードを一覧する

`GET /customers/{id}/reward-codes`

顧客が獲得したリワードの履行（ディスカウントコード）です。

**クエリパラメータ:**

| パラメータ | 型 | 説明 |
|-------|------|-------------|
| `available` | boolean | `1`／true の場合、未使用のコードのみを返します。 |

```json
[
  {
    "id": "501",
    "name": "$5 off",
    "code": "APPY-5OFF-XXXX",
    "used": false,
    "createdAt": "2026-06-05T12:00:00+00:00"
  }
]
```

### リワードコードのフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `name` | string | リワード名。 |
| `code` | string | ディスカウントコード。 |
| `used` | boolean | コードが使用済みかどうか。 |
| `createdAt` | string | ISO-8601 タイムスタンプ。 |
