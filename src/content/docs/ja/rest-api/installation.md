---
title: インストール
sidebar:
  order: 2
description: "REST API へのアクセスを取得し、最初のリクエストを送信します。"
---

## 1. アクセスをリクエストする

REST API はクローズドベータで、有料プランで動作します。ストアで有効化するには[お問い合わせ](https://appydesign.co.uk/contact)ください。

## 2. 認証情報を取得する

Appy Stamp の管理画面で**設定 → 開発者**を開き、**API アクセス（REST & GraphQL）**セクションを見つけます。以下を使用します。

- **API Key**、`X-Api-Key` ヘッダーとして送信します。
- **API Secret**、`X-Api-Secret` ヘッダーとして送信します。

認証情報とシークレットのローテーションの詳細については[認証](/ja/rest-api/authentication/)を参照してください。

## 3. 最初のリクエストを送信する

```bash
curl https://stamp.appydesign.io/rest_api/v1/shop \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "X-Api-Secret: YOUR_API_SECRET"
```

成功したレスポンスは標準のエンベロープでラップされます。

```json
{
  "success": true,
  "data": {
    "programName": "Loyalty Rewards",
    "currencySymbol": "$"
  },
  "timestamp": "2026-06-05T12:00:00+00:00"
}
```

次は[エンドポイント](/ja/rest-api/endpoints/shop/)を参照するか、レスポンスエンベロープ、ページネーション、レート制限などの規約について[概要](/ja/rest-api/overview/)をお読みください。
