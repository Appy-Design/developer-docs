---
title: インストール
sidebar:
  order: 2
description: "GraphQL APIへのアクセスを取得し、最初のクエリを実行する。"
---

## 1. アクセスをリクエストする

GraphQL APIはクローズドベータであり、有料プランで動作します。ストアで有効化するには[お問い合わせ](https://appydesign.co.uk/contact)ください。

## 2. 認証情報を取得する

**設定 → 開発者**で、**API Access (REST & GraphQL)**セクションを開きます。RESTとGraphQLは同じ**API Key**と**API Secret**を共有します。[認証](/ja/graphql-api/authentication/)を参照してください。

## 3. 最初のクエリを実行する

```bash
curl -X POST https://stamp.appydesign.io/graphql \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ shop { programName currencySymbol } }"}'
```

スキーマはイントロスペクション可能なため、GraphQLクライアントとコードジェネレーター（GraphiQL、Apollo、Insomnia）は、ヘッダーを付けてエンドポイントに向けると型を自動的に検出します。

次に、[スキーマリファレンス](/ja/graphql-api/reference/queries/shop/)を参照してください。
