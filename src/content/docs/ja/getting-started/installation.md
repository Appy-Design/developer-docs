---
title: インストール
sidebar:
  order: 2
description: Appy Stamp SDKをウェブサイトに追加する方法。
---

## SDKキーの取得

1. Appy Stamp管理画面を開く
2. **設定 > 開発者**に移動
3. まだの場合は**キーを生成**をクリック
4. **SDKキー**（公開）と**SDKシークレット**（秘密、サーバーサイドで保管）をコピー

## スクリプトの追加

このスニペットをHTMLの`</body>`タグの直前に配置してください:

```html
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY'
  };
</script>
<script async src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>
```

これにより、パブリックアクセスのみでSDKが読み込まれます。ショップ設定、獲得ルール、リワード、VIPティアが利用可能になりますが、顧客固有のデータは利用できません。

## 顧客認証の追加

顧客データ（残高、アクティビティ、交換）にアクセスするには、顧客情報とHMACハッシュを渡す必要があります。ハッシュはSDKシークレットを使って**サーバーサイドで**計算する必要があります。

```html
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY',
    customer: {
      id: 12345,
      email: 'customer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      hash: 'HMAC_SHA256_HASH'
    }
  };
</script>
<script async src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>
```

ハッシュの計算方法については[認証](/ja/getting-started/authentication)を参照してください。

## 動作確認

ブラウザコンソールを開いて実行:

```javascript
appyStamp.shop().then(console.log);
```

ショップ設定（プログラム名、スタンプブランディングなど）が表示されるはずです。顧客が認証されている場合:

```javascript
appyStamp.customer().then(console.log);
```

## 設定オプション

`window.APPY_SDK`オブジェクトは以下のプロパティを受け付けます:

| プロパティ | 必須 | 説明 |
|----------|------|------|
| `sdkKey` | はい | 設定 > 開発者で取得した公開SDKキー |
| `customer` | いいえ | 認証アクセス用の顧客オブジェクト |
| `customer.id` | はい（顧客使用時） | システム上の顧客ID |
| `customer.email` | はい（顧客使用時） | 顧客のメールアドレス |
| `customer.firstName` | はい（顧客使用時） | 顧客の名 |
| `customer.lastName` | はい（顧客使用時） | 顧客の姓 |
| `customer.hash` | はい（顧客使用時） | HMAC-SHA256ハッシュ（認証を参照） |
| `baseUrl` | いいえ | APIベースURLの上書き（テスト用のみ） |
