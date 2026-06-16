---
title: JavaScript API
sidebar:
  order: 1
description: ストアフロントからロイヤリティウィジェットを開く・閉じる・切り替える方法。
---

ロイヤリティウィジェットは、グローバル関数 `window._asl(...)` を公開しています。これを使うと、自分のテーマからウィジェットを操作できます。たとえば、組み込みのランチャーボタンの代わりに、ナビゲーションのリンクから開くことができます。

ウィジェットは（Appy Stamp アプリ経由で）すでにインストールされており、そのページで表示可能な状態である必要があります。現在のページや顧客に対してウィジェットを表示しない設定の場合、これらの呼び出しを行っても何も表示されません。

## ウィジェットを開く

```javascript
window._asl('open');
```

ナビゲーションリンクから開く場合：

```html
<a href="#" onclick="window._asl('open'); return false;">リワード</a>
```

## ウィジェットを閉じる

```javascript
window._asl('close');
```

## ウィジェットの開閉を切り替える

単一の切り替え用の呼び出しはないため、まず現在の状態を確認します：

```javascript
function toggleRewards() {
  var frame = document.querySelector('.stamped-launcher-frame-container');
  var isOpen = frame && frame.classList.contains('stamped-launcher-open');
  window._asl(isOpen ? 'close' : 'open');
}
```

## URL で自動的に開く

任意の URL に `?stamp=open` を追加すると、（表示可能な場合）読み込み時にウィジェットが開きます。メールや他のページからの「リワードを見る」リンクに便利です：

```
https://your-store.com/account?stamp=open
```

:::note[読み込み完了前の呼び出しも安全です]
`window._asl(...)` は、ウィジェットの読み込みが完了する前に行われた呼び出しをキューに入れ、準備ができ次第実行します。そのため「準備完了」イベントを待つ必要はありません。
:::

:::caution[ドキュメント化された呼び出しのみを使用してください]
ストアフロントで使用できるのは `open`、`close`、`?stamp=open` のみです。その他の内部関数も存在しますが、予告なく変更される可能性があるため、利用しないでください。
:::
