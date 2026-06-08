---
title: 顧客の更新
sidebar:
  order: 1
description: "updateCustomer ミューテーション: 既存のロイヤルティ顧客のプロフィールを更新します。"
---

## `updateCustomer(id, input)`

Shopify顧客IDで識別される既存のロイヤルティ顧客の誕生日を更新します。指定したフィールドのみが変更されます。

プロフィールフィールドは Shopify が管理しており、ここでは編集できません。顧客の名前、メールアドレス、電話番号は Shopify から同期されるため、このミューテーションでは変更できません。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `id` | `ID!` | Yes | Shopify顧客ID。 |
| `input` | `UpdateCustomerInput!` | Yes | 更新するフィールド（下記を参照）。 |

[`UpdateCustomerInput`](/ja/graphql-api/reference/inputs/) のフィールド:

| フィールド | 型 | 必須 | 説明 |
|-------|------|----------|-------------|
| `birthdayMonth` | `Int` | No | 誕生月（1〜12）。 |
| `birthdayDay` | `Int` | No | 誕生日（1〜31）。 |
| `excluded` | `Boolean` | No | `true` で顧客をロイヤルティプログラムから除外します（`state` が `removed` になります）。`false` で再び対象に含めます。 |

`excluded` が `true` の場合、顧客はスタンプの獲得、誕生日や記念日の特典、残高の再計算の対象外となり、この状態は Shopify の同期をまたいで保持されます。`false` にすると顧客が再び対象に含まれ、アカウントの状態が Shopify から読み戻されます。

[`Customer`](/ja/graphql-api/reference/types/) オブジェクトを返します（null許容。顧客が見つからない場合は `null`）。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | Shopify顧客ID（あらゆる場所での顧客の識別子）。 |
| `firstName` | `String` | 顧客の名。 |
| `lastName` | `String` | 顧客の姓。 |
| `email` | `String` | 顧客のメールアドレス。 |
| `stampBalance` | `Int` | 現在の利用可能なスタンプ残高。 |
| `vipTierId` | `Int` | 現在のVIPティアID（ある場合）。 |
| `vipTierName` | `String` | 現在のVIPティア名。 |
| `dateOfBirth` | `String` | "dd-mm" 形式の文字列。 |
| `state` | `String` | 顧客のロイヤルティ状態。 |
| `mergedIntoCustomerId` | `Int` | 顧客がマージされた場合、統合先の顧客ID。 |

### 例

```graphql
mutation ($id: ID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    id
    dateOfBirth
  }
}
```

```json
{
  "id": "6677889900",
  "input": {
    "birthdayMonth": 12,
    "birthdayDay": 10
  }
}
```

```json
{
  "data": {
    "updateCustomer": {
      "id": "6677889900",
      "dateOfBirth": "10-12"
    }
  }
}
```

除外を切り替える:

```graphql
mutation ($id: ID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    id
    state
  }
}
```

```json
{
  "id": "6677889900",
  "input": {
    "excluded": true
  }
}
```
