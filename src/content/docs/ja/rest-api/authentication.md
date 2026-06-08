---
title: 認証
sidebar:
  order: 3
description: "ショップの API キーとシークレットで REST リクエストを認証します。"
---

すべてのリクエストは、2 つのヘッダーを使ってマーチャントとして認証します。

| ヘッダー | 値 |
|--------|-------|
| `X-Api-Key` | ショップの API Key |
| `X-Api-Secret` | ショップの API Secret |
| `Content-Type` | `application/json` |

```bash
curl https://stamp.appydesign.io/rest_api/v1/shop \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET"
```

## 認証情報の場所

Appy Stamp の管理画面で**設定 → 開発者**を開き、**API アクセス（REST & GraphQL）**セクションを確認します。

- **API Key**: ショップの公開識別子です。安定しており、変更されることはほとんどありません。
- **API Secret**: サーバーサイドに保管し、クライアントコードに決して公開しないでください。ブラウザやストアフロントのユースケースでは、代わりに [JavaScript SDK](/ja/sdk/installation/) を使用してください。シークレットはこの画面からいつでもローテーションできます。ローテーションすると古いシークレットは即座に無効になるため、その際は連携先を更新してください。シークレットは SDK キーとは独立しています。

REST と GraphQL は同じ認証情報を共有します。

## 認証の失敗

認証情報が欠落しているか無効な場合は `401` が返されます。

```json
{
  "success": false,
  "error": {
    "message": "Invalid API credentials",
    "code": "UNAUTHORIZED",
    "statusCode": 401
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

クローズドベータに含まれていないストアでは、`API_ACCESS_DISABLED` とともに `403` が返されます。無料プランのストアでは、`PLAN_UPGRADE_REQUIRED` とともに `403` が返されます。
