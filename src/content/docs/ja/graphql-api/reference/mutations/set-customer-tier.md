---
title: 顧客のティアを設定する
sidebar:
  order: 9
description: "setCustomerTier ミューテーション: 顧客を VIP ティアに割り当てます。"
---

## `setCustomerTier(customerId, tierId, triggerRewards, comment, internalComment)`

顧客を VIP ティアに割り当てます。ティアは自身のショップに属している必要があります。デフォルトではティアを設定するだけです。`triggerRewards` を `true` にすると、管理画面のティア変更にある「このティアのリワードを付与する」にチェックを入れた場合と同様に、ティアに紐づくリワードも発行されます。

### 引数

| 名前 | 型 | 必須 | 説明 |
|------|------|----------|-------------|
| `customerId` | `ID!` | Yes | Shopify顧客ID。 |
| `tierId` | `ID!` | Yes | 割り当てるティア。 |
| `triggerRewards` | `Boolean` | No | `true` の場合、ティアのリワードも顧客に発行します。デフォルトは `false`。 |
| `comment` | `String` | No | この変更に対して記録される、顧客に表示されるメモ。 |
| `internalComment` | `String` | No | この変更に対して記録される、スタッフのみのメモ。 |

新しいティアを反映した、null非許容の [`Customer`](/ja/graphql-api/reference/types/) を返します。

### 戻り値 / フィールド

更新された [`Customer`](/ja/graphql-api/reference/types/) を返します。フィールドの一覧については型リファレンスを参照してください。

### 例

```graphql
mutation {
  setCustomerTier(customerId: "6677889900", tierId: "3") {
    id
    vipTierId
    vipTierName
  }
}
```

```json
{
  "data": {
    "setCustomerTier": {
      "id": "6677889900",
      "vipTierId": 3,
      "vipTierName": "Gold"
    }
  }
}
```

ティアが自身のショップに属していない場合はメッセージ `TIER_NOT_FOUND` のエラーを、不明な顧客の場合は `CUSTOMER_NOT_FOUND` のエラーを、変更を適用できなかった場合は `TIER_UPDATE_FAILED` のエラーを返します。
