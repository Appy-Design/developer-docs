---
title: 認証
sidebar:
  order: 3
description: 顧客認証用のHMACハッシュの計算方法。
---

SDKはHMAC-SHA256を使用して顧客の身元を確認します。ハッシュは**SDKシークレット**を使ってサーバーサイドで計算します（シークレットをクライアントサイドのコードに含めないでください）。

## ハッシュの形式

入力文字列は以下の値をこの順序で連結したものです:

```
sdkKey + email + firstName + customerId + lastName
```

区切り文字やスペースは入りません。ハッシュは以下のように計算します:

```
HMAC-SHA256(input, sdkSecret)
```

結果は小文字の16進数文字列（64文字）です。

## 言語別のサンプル

### Shopify Liquid

```liquid
{% assign sdk_key = 'YOUR_SDK_KEY' %}
{% assign sdk_secret = 'YOUR_SDK_SECRET' %}
{% assign input = sdk_key
  | append: customer.email
  | append: customer.first_name
  | append: customer.id
  | append: customer.last_name %}
{% assign hash = input | hmac_sha256: sdk_secret %}

<script>
  window.APPY_SDK = {
    sdkKey: '{{ sdk_key }}',
    customer: {
      id: {{ customer.id }},
      email: '{{ customer.email | escape }}',
      firstName: '{{ customer.first_name | escape }}',
      lastName: '{{ customer.last_name | escape }}',
      hash: '{{ hash }}'
    }
  };
</script>
```

### PHP

```php
$sdkKey = 'YOUR_SDK_KEY';
$sdkSecret = 'YOUR_SDK_SECRET';

$input = $sdkKey . $customer['email'] . $customer['first_name'] . $customer['id'] . $customer['last_name'];
$hash = hash_hmac('sha256', $input, $sdkSecret);
```

### Node.js

```javascript
const crypto = require('crypto');

const sdkKey = 'YOUR_SDK_KEY';
const sdkSecret = 'YOUR_SDK_SECRET';

const input = sdkKey + customer.email + customer.firstName + customer.id + customer.lastName;
const hash = crypto.createHmac('sha256', sdkSecret).update(input).digest('hex');
```

### Ruby

```ruby
require 'openssl'

sdk_key = 'YOUR_SDK_KEY'
sdk_secret = 'YOUR_SDK_SECRET'

input = sdk_key + customer[:email] + customer[:first_name] + customer[:id].to_s + customer[:last_name]
hash = OpenSSL::HMAC.hexdigest('sha256', sdk_secret, input)
```

### Python

```python
import hmac
import hashlib

sdk_key = 'YOUR_SDK_KEY'
sdk_secret = 'YOUR_SDK_SECRET'

input_str = sdk_key + customer['email'] + customer['first_name'] + str(customer['id']) + customer['last_name']
hash_value = hmac.new(sdk_secret.encode(), input_str.encode(), hashlib.sha256).hexdigest()
```

## ハッシュのテスト

**設定 > 開発者**のHMAC計算ツールを使ってテストハッシュを生成し、サーバーサイドの出力と比較してください。一致すれば実装は正しいです。

## セキュリティに関する注意

- SDKシークレットはクライアントサイドのコード、HTMLソース、JavaScriptに含めないこと
- ハッシュは特定の顧客に固有です。別の顧客には再利用できません
- SDKシークレットをローテーション（設定 > 開発者 > シークレットを再生成）すると、既存のすべてのハッシュが即座に無効になります
- SDKキーはクライアントサイドのコードに含めても安全です。ショップの識別のみに使用されます
