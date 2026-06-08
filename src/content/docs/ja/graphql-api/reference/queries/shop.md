---
title: Shop
sidebar:
  order: 1
description: "shopクエリ: ロイヤリティプログラムのショップレベル設定を取得する。"
---

## `shop`

ロイヤリティプログラムのショップレベル設定（表示名、スタンプのブランディング、通貨、スタンプカードのサイズ）を返します。引数を取りません。

[`Shop`](/ja/graphql-api/reference/types/)オブジェクトを返します（nullable）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `programName` | `String` | ロイヤリティプログラムの表示名。 |
| `stampBrandingPlural` | `String` | スタンプを表すマーチャントの複数形の名詞（例: "stamps"、"beans"）。 |
| `stampCardValue` | `Int` | 1枚のスタンプカードを構成するスタンプの数。 |
| `currency` | `String` | ISO通貨コード。 |
| `currencySymbol` | `String` | 表示用の通貨記号。 |

### 例

```graphql
query {
  shop {
    programName
    stampBrandingPlural
    stampCardValue
    currency
    currencySymbol
  }
}
```

```json
{
  "data": {
    "shop": {
      "programName": "Bean Club",
      "stampBrandingPlural": "beans",
      "stampCardValue": 10,
      "currency": "GBP",
      "currencySymbol": "£"
    }
  }
}
```
