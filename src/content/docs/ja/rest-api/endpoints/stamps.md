---
title: スタンプ
sidebar:
  order: 7
description: REST API で顧客のスタンプ残高を付与または調整します。
---

顧客のスタンプ残高を付与または調整します。どちらもロイヤルティアクティビティを作成し、通常の後続処理（VIP の再計算など）を実行します。

顧客の `{id}` はその Shopify 顧客 ID です。

## スタンプを付与する

`POST /customers/{id}/stamps/award`

スタンプを追加します（正の値のみ）。

**ボディ:**

| フィールド | 型 | 必須 | 備考 |
|-------|------|----------|-------|
| `stamps` | integer | yes | 付与するスタンプ数。1 以上である必要があります。 |
| `comment` | string | no | アクティビティに表示される顧客向けのメモ。省略した場合は、ストアのブランド化された手動調整ラベルが既定値になります。 |
| `internal_comment` | string | no | スタッフのみが閲覧でき、顧客には表示されないメモ。省略した場合は「API adjustment」が既定値になります。 |

```json
// returns
{
  "customerId": "6677889900",
  "stampChange": 5,
  "stampBalance": 40
}
```

### スタンプ結果のフィールド

付与エンドポイントと調整エンドポイントの両方が、これらのフィールドを持つオブジェクトを返します。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `customerId` | string | 対象となった顧客の ID。 |
| `stampChange` | integer | 適用されたスタンプの変化量（減算の場合は負）。 |
| `stampBalance` | integer | 結果としてのスタンプ残高。 |

## スタンプを調整する

`POST /customers/{id}/stamps/adjust`

スタンプを増減します（減算するには負の値を使用）。`stamps` は `0` であってはなりません。

**ボディ:**

| フィールド | 型 | 必須 | 備考 |
|-------|------|----------|-------|
| `stamps` | integer | yes | 0 以外の任意の整数（減算するには負の値）。 |
| `comment` | string | no | アクティビティに表示される顧客向けのメモ。省略した場合は、ストアのブランド化された手動調整ラベルが既定値になります。 |
| `internal_comment` | string | no | スタッフのみが閲覧でき、顧客には表示されないメモ。省略した場合は「API adjustment」が既定値になります。 |

```bash
curl -X POST https://stamp.appydesign.io/rest_api/v1/customers/6677889900/stamps/adjust \
  -H "X-Api-Key: ..." -H "X-Api-Secret: ..." -H "Content-Type: application/json" \
  -d '{"stamps": -3, "comment": "Manual correction", "internal_comment": "Stock count fix"}'
```

[スタンプ結果](#スタンプ結果のフィールド)を返します。
