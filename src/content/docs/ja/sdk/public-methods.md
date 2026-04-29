---
title: パブリックメソッド
sidebar:
  order: 1
description: 顧客認証なしで使用できるSDKメソッド。
---

これらのメソッドはSDKキーのみ必要です。顧客ログインは不要です。

## appyStamp.shop()

ショップの設定とブランディング情報を返します。

```javascript
appyStamp.shop().then(function (data) {
  console.log(data);
});
```

**戻り値:**

```json
{
  "program_name": "Loyalty Rewards",
  "stamp_branding_plural": "stamps",
  "stamp_card_value": 10,
  "currency": "USD",
  "currency_symbol": "$"
}
```

最初の呼び出し後はキャッシュされます。以降の呼び出しはリクエストなしでキャッシュデータを返します。

---

## appyStamp.earnRules(opts)

アクティブな獲得ルールを返します。顧客がスタンプを獲得する方法の一覧です。

```javascript
// 全ルールを取得
appyStamp.earnRules().then(function (data) {
  console.log(data.items);
});

// ページネーション付き
appyStamp.earnRules({ page: 1 }).then(function (data) {
  console.log(data.items);
  console.log(data.has_more);  // 次のページがあればtrue
  console.log(data.next_page); // 次のページ番号、またはnull
});
```

**パラメータ:**

| 名前 | 型 | デフォルト | 説明 |
|------|------|---------|------|
| `page` | number | (全件) | ページ番号。省略すると全ルールを1リクエストで返します。 |

**戻り値:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "注文する",
      "icon_url": "https://storage.googleapis.com/.../place-order.svg",
      "step": 1,
      "multiplier": 1.0,
      "type": "shopify_online_order",
      "reward_value_type": "variable"
    }
  ],
  "has_more": false,
  "next_page": null
}
```

`has_more`と`next_page`は`page`パラメータを渡した場合のみ含まれます。

---

## appyStamp.rewards(opts)

顧客がスタンプを交換できるリワード商品を返します。

```javascript
appyStamp.rewards().then(function (data) {
  console.log(data.items);
});

appyStamp.rewards({ page: 1 }).then(function (data) {
  console.log(data.items);
});
```

**パラメータ:**

| 名前 | 型 | デフォルト | 説明 |
|------|------|---------|------|
| `page` | number | (全件) | ページ番号。省略すると全リワードを1リクエストで返します。 |

**戻り値:**

```json
{
  "items": [
    {
      "id": 42,
      "name": "$5 割引コード",
      "price": 50,
      "price_label": "50 スタンプ",
      "exchange_type": "fixed",
      "icon_url": "https://..."
    }
  ]
}
```

`price_label`は正しい単位でフォーマット済みです。カードベースのリワードの場合は「1 card」と表示されます。

顧客が認証されている場合（SDKが`customer()`を呼び出してトークンを取得済みの場合）、リワードに追加フィールドが含まれます:

```json
{
  "id": 42,
  "name": "500円割引コード",
  "price": 50,
  "price_label": "50 スタンプ",
  "exchange_type": "fixed",
  "icon_url": "https://...",
  "can_afford": true,
  "stamps_needed": 0,
  "stamps_needed_label": "0 more stamps needed"
}
```

| フィールド | 型 | 説明 |
|----------|------|------|
| `can_afford` | boolean | 顧客がこのリワードを交換するのに十分なスタンプを持っているか |
| `stamps_needed` | number | あと何スタンプ必要か（交換可能な場合は0） |
| `stamps_needed_label` | string | フォーマット済みラベル（例: "8 more stamps needed"） |

カードベースのリワードの場合、カード価格は自動的にスタンプに変換されます。10スタンプカードで1カードのリワードには10スタンプが必要です。

これらのフィールドは顧客が認証されている場合のみ含まれます。未ログインの場合は基本フィールドのみ返されます。

---

## appyStamp.vipTiers()

VIPティアの定義をマイルストーン順で返します。

```javascript
appyStamp.vipTiers().then(function (data) {
  console.log(data.items);
});
```

**戻り値:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "ブロンズ",
      "milestone": 0,
      "icon_url": null,
      "benefits": "5,000円以上の注文で送料無料"
    },
    {
      "id": 2,
      "name": "ゴールド",
      "milestone": 100,
      "icon_url": "https://...",
      "benefits": "全注文10%オフ、送料無料"
    }
  ]
}
```

顧客が認証されている場合、各ティアに`is_current`フィールドが含まれます:

```json
{
  "id": 2,
  "name": "ゴールド",
  "milestone": 100,
  "icon_url": "https://...",
  "benefits": "全注文10%オフ、送料無料",
  "is_current": true
}
```

このフィールドは顧客がログインしている場合のみ含まれます。`customer().vip_tier_id`と照合する必要なく、顧客の現在のティアをハイライトできます。

---

## appyStamp.beacons()

アクティブなビーコン（プロモーションメッセージ）を返します。

```javascript
appyStamp.beacons().then(function (data) {
  console.log(data.items);
});
```

**戻り値:**

```json
{
  "items": [
    {
      "id": 1,
      "name": "ウェルカムボーナス",
      "message": "登録で50ボーナススタンプ獲得！",
      "icon": "product_bonus",
      "active": true
    }
  ]
}
```
