---
title: ショップ
sidebar:
  order: 1
description: REST API でロイヤルティプログラムのブランディングと通貨設定を読み取ります。
---

ロイヤルティプログラムのブランディングと通貨設定を読み取ります。

## ショップ設定を取得する

`GET /shop`

プログラムのブランディングと通貨設定を返します。

```json
{
  "programName": "Loyalty Rewards",
  "stampBrandingPlural": "stamps",
  "stampCardValue": 10,
  "currency": "USD",
  "currencySymbol": "$"
}
```

### レスポンスフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `programName` | string | ロイヤルティプログラムの表示名。 |
| `stampBrandingPlural` | string | マーチャントが設定したスタンプの複数形の名詞（例: "stamps"、"beans"）。 |
| `stampCardValue` | integer | 1 枚のスタンプカードを構成するスタンプ数。 |
| `currency` | string | ISO 通貨コード。 |
| `currencySymbol` | string | 表示用の通貨記号。 |
