---
title: GraphQL API 概要
sidebar:
  order: 1
description: Appy Stampロイヤリティエンジン上の、型付けされた単一エンドポイントのGraphQLインターフェース。
---

Appy Stamp GraphQL APIは、単一の型付けされたエンドポイントを通じて、[REST API](/ja/rest-api/overview/)と同じロイヤリティデータと機能を提供します。1回の往復で必要なフィールドだけを正確に取得したい場合や、自己記述的でイントロスペクション可能なスキーマを好む場合はGraphQLを選択してください。

:::caution[クローズドベータ]
REST & GraphQL APIは現在**クローズドベータ**です。認証情報が機能する前に、ストアで有効化する必要があります。アクセスをリクエストするには[お問い合わせ](https://appydesign.co.uk/contact)ください。
:::

## エンドポイント

```
POST https://stamp.appydesign.io/graphql
```

単一のエンドポイントがすべてのクエリとミューテーションを処理します。

## 認証

`X-Api-Key`と`X-Api-Secret`ヘッダーを使用してマーチャントとして認証します（RESTと同じ認証情報です）。詳細は[認証](/ja/graphql-api/authentication/)を、最初のクエリの実行については[インストール](/ja/graphql-api/installation/)を参照してください。

## リクエストの送信

`query`とオプションの`variables`を含むJSONボディを送信します。

```bash
curl -X POST https://stamp.appydesign.io/graphql \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query ($id: ID!) { customer(id: $id) { id firstName stampBalance } }",
    "variables": { "id": "6677889900" }
  }'
```

```json
{
  "data": {
    "customer": {
      "id": "6677889900",
      "firstName": "Ada",
      "stampBalance": 35
    }
  }
}
```

レスポンスは、RESTのエンベロープではなく、標準的なGraphQLの形式（`{ "data": ... }`、および問題が発生した場合は`{ "errors": [...] }`）に従います。

## エラー

失敗は`errors`配列に表示されます。想定される、クライアントに安全な状態は、REST APIと同じコードをエラー`message`に持ちます（例: `CUSTOMER_NOT_FOUND`、`REWARD_NOT_FOUND`、`INSUFFICIENT_STAMPS`、`ACTIVITY_NOT_AWARDED`）。

```json
{
  "data": {
    "customer": null
  },
  "errors": [
    {
      "message": "CUSTOMER_NOT_FOUND",
      "path": ["customer"]
    }
  ]
}
```

## テナントスコープ

すべてのクエリとミューテーションは、APIキーで識別されるショップに自動的にスコープされます。読み書きできるのは自分のショップの顧客、リワード、アクティビティ、ティアのみです。別のショップに属するIDは「見つからない」として解決されます。

## イントロスペクション

スキーマはイントロスペクション可能なため、GraphQLクライアント、コードジェネレーター、IDEツール（GraphiQL、Apollo、Insomniaなど）が型とフィールドを自動的に検出できます。APIヘッダーを付けてツールをエンドポイントに向けてください。

## 次のステップ

完全な型システムとすべてのクエリおよびミューテーションについては[スキーマリファレンス](/ja/graphql-api/reference/queries/shop/)を、同等のリソース指向インターフェースについては[REST API](/ja/rest-api/overview/)を参照してください。
