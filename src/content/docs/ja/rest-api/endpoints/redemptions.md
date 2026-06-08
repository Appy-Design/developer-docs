---
title: 交換
sidebar:
  order: 10
description: REST API で顧客に代わってリワードを交換します。
---

顧客に代わってリワードを交換します。

顧客の `{id}` はその Shopify 顧客 ID です。

## リワードを交換する

`POST /customers/{id}/redemptions`

顧客に代わってリワードを交換します。スタンプのコストを差し引き、ディスカウントコードを返します。

**ボディ:**

| フィールド | 型 | 必須 | 備考 |
|-------|------|----------|-------|
| `reward_product_id` | integer | yes | 交換するリワード（`/rewards` の `id`）。 |
| `variable_amount` | integer | no | 可変価値リワード向けの任意のスタンプ量。 |

```json
// returns
{
  "code": "APPY-5OFF-XXXX",
  "name": "$5 off",
  "stampBalance": 30
}
```

### レスポンスフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `code` | string | 発行されたディスカウントコード。 |
| `name` | string | リワード名。 |
| `stampBalance` | integer | 差し引き後の結果としてのスタンプ残高。 |

顧客がリワードを交換するのに十分なスタンプを持っていない場合は `422 INSUFFICIENT_STAMPS` を、不明なリワードの場合は `404 REWARD_NOT_FOUND` を返します。
