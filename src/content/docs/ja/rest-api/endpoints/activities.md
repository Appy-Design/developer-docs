---
title: アクティビティ
sidebar:
  order: 8
description: REST API で顧客のロイヤルティ台帳を読み取り、獲得ルールを処理します。
---

顧客のロイヤルティ台帳を読み取り、その顧客に代わって獲得ルールを処理します。

顧客の `{id}` はその Shopify 顧客 ID です。

## アクティビティを一覧する

`GET /customers/{id}/activities`

カーソルでページネーションされた顧客のロイヤルティ台帳です（新しい順）。

**クエリパラメータ:**

| パラメータ | 型 | 説明 |
|-------|------|-------------|
| `limit` | integer | ページサイズ、1〜1000（デフォルト 20）。 |
| `after` | string | 次のページ用カーソル。 |
| `before` | string | 前のページ用カーソル。 |
| `hasCount` | boolean | `meta.pagination` に合計 `count` を含める（低速）。 |

詳細は[ページネーション](/ja/rest-api/overview/#ページネーション)を参照してください。

```json
[
  {
    "id": "9001",
    "label": "Placed an order",
    "stampChange": 5,
    "createdAt": "2026-06-05T12:00:00+00:00"
  }
]
```

### アクティビティのフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `label` | string | アクティビティの人間が読める説明。 |
| `stampChange` | integer | 追加または削除されたスタンプ（減算の場合は負）。 |
| `createdAt` | string | ISO-8601 タイムスタンプ。 |

### ページネーションのフィールド（`meta.pagination`）

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `hasNext` | boolean | 次のページが続くかどうか。 |
| `hasPrevious` | boolean | 前のページが存在するかどうか。 |
| `nextCursor` | string | 次のページを取得するためのカーソル（`after` として渡す）。 |
| `previousCursor` | string | 前のページ用カーソル（`before` として渡す）。 |
| `count` | integer | 一致するレコードの総数（`hasCount=true` のときのみ。それ以外は `null`）。 |

## 獲得ルールを処理する

`POST /customers/{id}/activities`

顧客の獲得ルールを処理します（例: SNS フォローやレビューの完了に対してスタンプを付与）。

**ボディ:**

| フィールド | 型 | 必須 | 説明 |
|-------|------|----------|-------------|
| `earn_rule_id` | integer | yes | 処理する獲得ルール（`/earn-rules` の `id`）。 |

```json
// returns
{
  "customerId": "6677889900",
  "stampChange": 5,
  "stampBalance": 45
}
```

### レスポンスフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `customerId` | string | 対象となった顧客の ID。 |
| `stampChange` | integer | 適用されたスタンプの変化量。 |
| `stampBalance` | integer | 結果としてのスタンプ残高。 |

不明なルールの場合は `404 EARN_RULE_NOT_FOUND` を、ルールを付与できなかった場合（例: レート制限、または顧客が対象外）は `422 ACTIVITY_NOT_AWARDED` を返します。
