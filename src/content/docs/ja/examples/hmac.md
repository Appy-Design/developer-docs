---
title: HMACハッシュ生成
sidebar:
  order: 1
description: 各言語での顧客ハッシュ計算の実用的なサンプル。
---

HMACハッシュは、顧客データがサーバーから送信されたもので改ざんされていないことを証明します。計算には**SDKシークレット**が必要です。シークレットはフロントエンドコードには含めないでください。

## 計算式

```
input = sdkKey + email + firstName + customerId + lastName
hash  = HMAC-SHA256(input, sdkSecret)
```

すべての値は区切り文字なしで直接連結します。

## 完全な実装例（Node.js + Express）

```javascript
const crypto = require('crypto');
const express = require('express');
const app = express();

const SDK_KEY = process.env.APPY_SDK_KEY;
const SDK_SECRET = process.env.APPY_SDK_SECRET;

app.get('/loyalty', (req, res) => {
  const customer = {
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };

  const input = SDK_KEY + customer.email + customer.firstName + customer.id + customer.lastName;
  const hash = crypto.createHmac('sha256', SDK_SECRET).update(input).digest('hex');

  res.render('loyalty', {
    sdkKey: SDK_KEY,
    customer: customer,
    hash: hash,
  });
});
```

## 完全な実装例（PHP）

```php
<?php
$sdkKey = getenv('APPY_SDK_KEY');
$sdkSecret = getenv('APPY_SDK_SECRET');

$customer = [
    'id' => $user->id,
    'email' => $user->email,
    'firstName' => $user->first_name,
    'lastName' => $user->last_name,
];

$input = $sdkKey . $customer['email'] . $customer['firstName'] . $customer['id'] . $customer['lastName'];
$hash = hash_hmac('sha256', $input, $sdkSecret);
?>
```

## ハッシュ不一致のデバッグ

SDKが「Invalid customer hash」を返す場合、以下を確認してください:

1. **空白文字。** メール、名、姓に先頭や末尾のスペースがないこと。SDKはサーバーサイドでトリムします。

2. **フィールドの順序。** 順序は: sdkKey、email、firstName、id、lastName。アルファベット順ではありません。

3. **顧客IDの型。** IDはそのまま含めてください（数値または文字列）。型変換に注意。

4. **シークレットの間違い。** SDKシークレットを使用していることを確認。APIシークレットとは別のキーです。

5. **ローテーション済みシークレット。** 設定 > 開発者でシークレットを再生成した場合、既存のすべてのハッシュは無効です。再計算が必要です。

設定 > 開発者のHMAC計算ツールで正しいハッシュを生成し、出力と比較してください。
