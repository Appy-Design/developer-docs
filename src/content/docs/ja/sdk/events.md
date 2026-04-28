---
title: イベント
sidebar:
  order: 3
description: SDKが発火するイベント。
---

SDKは重要なタイミングでイベントを発火します。`appyStamp.on()`で購読し、`appyStamp.off()`で購読解除します。

## イベントの購読

```javascript
function onReady(data) {
  console.log('SDK準備完了、認証済み:', data.authenticated);
}

appyStamp.on('appy:ready', onReady);

// 後で購読解除:
appyStamp.off('appy:ready', onReady);
```

## 利用可能なイベント

### appy:ready

SDKの初期化が完了した時に1回発火します。ショップデータは読み込み済みで、顧客データが提供されていれば認証も完了しています。

```javascript
appyStamp.on('appy:ready', function (data) {
  if (data.authenticated) {
    appyStamp.customer().then(renderLoyaltyWidget);
  }
});
```

**データ:**

| プロパティ | 型 | 説明 |
|----------|------|------|
| `authenticated` | boolean | 顧客が認証されたかどうか |

### appy:redeemed

`appyStamp.redeem()`でリワードが交換された時に発火します。

```javascript
appyStamp.on('appy:redeemed', function (data) {
  alert('ディスカウントコード: ' + data.code);
});
```

**データ:**

| プロパティ | 型 | 説明 |
|----------|------|------|
| `code` | string | ディスカウントコード |
| `name` | string | リワード名 |
| `balance` | number | 顧客の新しいスタンプ残高 |

### appy:error

SDKメソッドでエラーが発生した時に発火します。

```javascript
appyStamp.on('appy:error', function (data) {
  console.error('SDKエラー:', data.method, ':', data.error);
});
```

**データ:**

| プロパティ | 型 | 説明 |
|----------|------|------|
| `method` | string | 失敗したSDKメソッド（例: "shop", "customer", "redeem/42"） |
| `error` | string | エラーメッセージ |
