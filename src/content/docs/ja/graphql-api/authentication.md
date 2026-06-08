---
title: 認証
sidebar:
  order: 3
description: "ショップのAPIキーとシークレットでGraphQLリクエストを認証する。"
---

2つのヘッダーを使用してマーチャントとして認証します。これらはREST APIと同じ認証情報です。

| ヘッダー | 値 |
|--------|-------|
| `X-Api-Key` | ショップのAPI Key |
| `X-Api-Secret` | ショップのAPI Secret |
| `Content-Type` | `application/json` |

## 認証情報の場所

**設定 → 開発者**を開き、**API Access (REST & GraphQL)**セクションを確認します。API Keyはショップの安定した公開識別子です。API Secretはその画面からローテーション可能で、サーバーサイドで保持する必要があります。ローテーションしたシークレットはRESTとGraphQLの両方に適用されます。API SecretはSDKキーとは独立しています。

## 認証の失敗

認証情報の欠落や無効、クローズドベータ外のストア、または無料プランのストアは、`errors`配列にエラーを返します（例: `UNAUTHORIZED`、`API_ACCESS_DISABLED`、`PLAN_UPGRADE_REQUIRED`）。
