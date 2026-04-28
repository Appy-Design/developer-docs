---
title: 認証済みメソッド
sidebar:
  order: 2
description: 顧客認証が必要なSDKメソッド。
---

これらのメソッドは`window.APPY_SDK.customer`設定で顧客が認証されている必要があります。認証なしで呼び出すとエラーが返されます。

## appyStamp.customer()

認証済み顧客のロイヤルティデータを返します。

```javascript
appyStamp.customer().then(function (customer) {
  console.log(customer);
});
```

**戻り値:**

```json
{
  "id": 12345,
  "first_name": "太郎",
  "last_name": "山田",
  "email": "taro@example.com",
  "cards": 4,
  "stamps": 2,
  "stamps_label": "スタンプ",
  "vip_tier_name": "ゴールド",
  "vip_tier_id": 3,
  "next_reward": {
    "name": "500円割引コード",
    "stamps_needed": 8
  },
  "available_rewards": 2,
  "stamps_expires_at": "2026-12-31T00:00:00+00:00",
  "vip_expires_at": "2026-12-31"
}
```

残高はカードとスタンプで表示されます（合計値ではありません）。`stamps_label`はマーチャントのカスタムブランディングを反映します。

最初の呼び出し後はキャッシュされます。

---

## appyStamp.activity(opts)

顧客のスタンプアクティビティ履歴を新しい順で返します。

```javascript
appyStamp.activity({ page: 1 }).then(function (data) {
  console.log(data.items);
});
```

**パラメータ:**

| 名前 | 型 | デフォルト | 説明 |
|------|------|---------|------|
| `page` | number | 1 | ページ番号 |

**戻り値:**

```json
{
  "items": [
    {
      "id": 1001,
      "label": "注文しました",
      "stamp_change": 12,
      "created_at": "2026-04-20T10:30:00+00:00"
    },
    {
      "id": 1000,
      "label": "500円割引を交換",
      "stamp_change": -50,
      "created_at": "2026-04-18T14:00:00+00:00"
    }
  ],
  "has_more": true,
  "next_page": 2
}
```

正の`stamp_change`は獲得、負の値は使用/交換です。

---

## appyStamp.rewardCodes(opts)

顧客が獲得したリワードコード（交換で取得したディスカウントコード）を返します。

```javascript
// 全コード
appyStamp.rewardCodes({ page: 1 }).then(function (data) {
  console.log(data.items);
});

// 未使用コードのみ
appyStamp.rewardCodes({ page: 1, available: true }).then(function (data) {
  console.log(data.items);
});
```

**パラメータ:**

| 名前 | 型 | デフォルト | 説明 |
|------|------|---------|------|
| `page` | number | 1 | ページ番号 |
| `available` | boolean | false | trueの場合、未使用コードのみ返す |

---

## appyStamp.redeem(rewardProductId, opts)

リワード商品を交換し、ディスカウントコードを返します。顧客のスタンプ残高は自動的に差し引かれます。

```javascript
appyStamp.redeem(42).then(function (result) {
  console.log(result.code);    // "SAVE5-X2K9"
  console.log(result.name);    // "500円割引コード"
  console.log(result.balance); // 45（新しいスタンプ残高）
});
```

可変値リワードの場合は金額を指定:

```javascript
appyStamp.redeem(42, { variableAmount: 100 }).then(function (result) {
  console.log(result);
});
```

**パラメータ:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `rewardProductId` | number | はい | リワード商品ID（`rewards()`から取得） |
| `opts.variableAmount` | number | いいえ | 可変値リワード用のスタンプ数 |

成功時に`appy:redeemed`イベントを発火します。スタンプが不足している場合はRejectされたPromiseを返します。

---

## appyStamp.processActivity(ruleId)

顧客のアクティビティをトリガーします（SNSフォロー、レビューなど）。

```javascript
appyStamp.processActivity(7).then(function (result) {
  console.log(result); // { success: true }
});
```

**パラメータ:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `ruleId` | number | はい | アクティビティルールID（`earnRules()`から取得） |

---

## appyStamp.updateBirthday(month, day)

顧客の生年月日を更新します。バースデーリワードの資格に使用されます。

```javascript
appyStamp.updateBirthday(12, 25).then(function (result) {
  console.log(result); // { success: true }
});
```

**パラメータ:**

| 名前 | 型 | 必須 | 説明 |
|------|------|------|------|
| `month` | number | はい | 月（1-12） |
| `day` | number | はい | 日（1-31） |

---

## appyStamp.isAuthenticated()

顧客が認証されている場合は`true`を返します。同期的に返します（Promiseではありません）。

```javascript
if (appyStamp.isAuthenticated()) {
  // 認証済みメソッドを安全に呼び出せる
}
```
