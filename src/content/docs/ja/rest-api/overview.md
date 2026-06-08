---
title: REST API 概要
sidebar:
  order: 1
description: "Appy Stamp ロイヤルティエンジンへのサーバー間 REST アクセス: 認証、規約、エラー処理。"
---

Appy Stamp REST API は、自社のバックエンド、CRM、自動化ツールからロイヤルティデータを読み書きするための**サーバー間**インターフェースです。[JavaScript SDK](/ja/getting-started/introduction/)（ブラウザ上で動作し、ログイン中の単一顧客にスコープされます）とは異なり、REST API は**マーチャント**として認証し、ショップ内の任意の顧客に対して操作できます。

REST API と [GraphQL](/ja/graphql-api/overview/) API は同じロイヤルティデータと機能を公開しているため、ご自身のスタックに合う方を選択できます。

:::caution[クローズドベータ]
REST & GraphQL API は現在**クローズドベータ**です。認証情報を使用する前に、ストアで有効化されている必要があります。アクセスをリクエストするには[お問い合わせ](https://appydesign.co.uk/contact)ください。
:::

## ベース URL

```
https://stamp.appydesign.io/rest_api/v1
```

すべてのエンドポイントは `/rest_api/v1` プレフィックスの配下にあります。

## 認証

リクエストは `X-Api-Key` および `X-Api-Secret` ヘッダーを使ってマーチャントとして認証します。認証情報とシークレットのローテーション方法については[認証](/ja/rest-api/authentication/)を、最初のリクエストを送る方法については[インストール](/ja/rest-api/installation/)を参照してください。

## レスポンスエンベロープ

成功したすべてのレスポンスは、一貫したエンベロープでラップされます。

```json
{
  "success": true,
  "data": { },
  "meta": { },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

| フィールド | 説明 |
|-------|-------------|
| `success` | 2xx レスポンスでは `true`、エラーでは `false` |
| `data` | リソース、またはリストエンドポイントではリソースの配列 |
| `meta` | リストエンドポイントに存在し、`pagination` と `count` を保持 |
| `timestamp` | ISO-8601 のサーバー時刻 |

`null` 値のフィールドは、ペイロードをコンパクトに保つため `data` から**省略**されます。

## エラー

エラーは同じエンベロープに `error` オブジェクトを加えた形式を使用します。

```json
{
  "success": false,
  "error": {
    "message": "Customer not found",
    "code": "CUSTOMER_NOT_FOUND",
    "statusCode": 404
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

| コード | HTTP | 意味 |
|------|------|---------|
| `UNAUTHORIZED` | 401 | API 認証情報が欠落しているか無効 |
| `API_ACCESS_DISABLED` | 403 | ストアで開発者 API が有効化されていない（クローズドベータ） |
| `PLAN_UPGRADE_REQUIRED` | 403 | 開発者 API には有料プランが必要 |
| `VALIDATION_ERROR` | 422 | リクエストボディのバリデーションに失敗 |
| `CUSTOMER_NOT_FOUND` | 404 | ショップに該当する顧客が存在しない |
| `REWARD_NOT_FOUND` | 404 | ショップに該当するリワードが存在しない |
| `EARN_RULE_NOT_FOUND` | 404 | ショップに該当する獲得ルールが存在しない |
| `TIER_NOT_FOUND` | 404 | ショップに該当する VIP ティアが存在しない |
| `INSUFFICIENT_STAMPS` | 422 | 顧客が交換に必要なスタンプを十分に持っていない |
| `ACTIVITY_NOT_AWARDED` | 422 | 獲得ルールを付与できなかった（例: レート制限または対象外） |
| `RATE_LIMITED` | 429 | レート制限を超過 |
| `INTERNAL_ERROR` | 500 | 予期しないサーバーエラー |

## ページネーション

大きくなり得るリストエンドポイント（`/customers`、`/customers/{id}/activities`）は、**カーソルベース**のページネーションを使用します。

| クエリパラメータ | 説明 |
|-------------|-------------|
| `limit` | ページサイズ（デフォルト `20`、最大 `1000`） |
| `after` | 次のページ用カーソル（`meta.pagination.nextCursor` を渡す） |
| `before` | 前のページ用カーソル |
| `hasCount` | 合計 `count` を含めるには `true` に設定（低速になります） |

カーソルは `meta.pagination` に格納されます。

```json
{
  "success": true,
  "data": [ /* ...items... */ ],
  "meta": {
    "pagination": {
      "hasNext": true,
      "hasPrevious": false,
      "nextCursor": "aWQ6MTAx",
      "previousCursor": "aWQ6MQ==",
      "count": null
    }
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

前方へ進むには、`hasNext` が `false` になるまで、直前のレスポンスの `nextCursor` を `after` として渡し続けます。比較的小さな参照リスト（`/earn-rules`、`/rewards`、`/tiers`、`/beacons`、リワードコード）は、`meta.count` とともに全件返されます。

## レート制限

リクエストは**ショップごとに 1 時間あたり 1000 件**に制限されます。すべてのレスポンスには次のヘッダーが含まれます。

| ヘッダー | 説明 |
|--------|-------------|
| `X-RateLimit-Limit` | 1 時間あたりのクォータ |
| `X-RateLimit-Remaining` | 現在のウィンドウで残っているリクエスト数 |

制限を超えると、`RATE_LIMITED` コードとともに `429` が返されます。

## 次のステップ

すべてのリソースについては[エンドポイントリファレンス](/ja/rest-api/endpoints/shop/)を、同じデータに対する型付きの単一エンドポイントインターフェースをお好みであれば [GraphQL API](/ja/graphql-api/overview/) を参照してください。
