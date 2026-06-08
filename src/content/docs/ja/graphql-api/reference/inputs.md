---
title: 入力
sidebar:
  order: 4
description: Appy Stamp GraphQLスキーマのすべての入力型を、フィールドの説明とともに掲載します。
---

ミューテーションが受け付ける入力型です。

## UpdateCustomerInput

[`updateCustomer`](/ja/graphql-api/reference/mutations/update-customer/) の入力です。指定したフィールドのみが変更されます。

```graphql
input UpdateCustomerInput {
  birthdayMonth: Int
  birthdayDay: Int
  excluded: Boolean
}
```

| フィールド | 型 | 必須 | 説明 |
|-------|------|----------|-------------|
| `birthdayMonth` | `Int` | No | 誕生月（1〜12）。 |
| `birthdayDay` | `Int` | No | 誕生日（1〜31）。 |
| `excluded` | `Boolean` | No | `true` で顧客をロイヤルティプログラムから除外します（`state` が `removed` になります）。`false` で再び対象に含め、状態を Shopify から読み戻します。 |
