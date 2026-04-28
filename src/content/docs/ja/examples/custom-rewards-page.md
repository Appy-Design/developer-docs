---
title: カスタムリワードページ
sidebar:
  order: 2
description: SDKを使ってリワードページをゼロから構築する。
---

この例では、顧客の残高、交換ボタン付きのリワード一覧、獲得済みコードを表示するシンプルなリワードページを構築します。

## HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>マイリワード</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }
    .balance { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .reward { border: 1px solid #ddd; padding: 16px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    .code { background: #e8f5e9; padding: 12px; border-radius: 8px; margin-bottom: 8px; }
    button { background: #2c6ecb; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    h2 { margin-top: 32px; }
  </style>
</head>
<body>

<div id="app">読み込み中...</div>

<!-- SDK設定（サーバーサイドでレンダリング） -->
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY',
    customer: {
      id: 12345,
      email: 'customer@example.com',
      firstName: '太郎',
      lastName: '山田',
      hash: 'SERVER_COMPUTED_HASH'
    }
  };
</script>
<script src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>

<script>
  var app = document.getElementById('app');

  appyStamp.on('appy:ready', function (data) {
    if (!data.authenticated) {
      app.innerHTML = '<p>リワードを表示するにはログインしてください。</p>';
      return;
    }
    renderPage();
  });

  function renderPage() {
    Promise.all([
      appyStamp.customer(),
      appyStamp.rewards(),
      appyStamp.rewardCodes({ page: 1, available: true })
    ]).then(function (results) {
      var customer = results[0];
      var rewards = results[1];
      var codes = results[2];

      var html = '';

      // 残高セクション
      html += '<div class="balance">';
      html += '<h1>' + customer.first_name + 'さん、こんにちは</h1>';
      html += '<p><strong>' + customer.cards + ' カード & ' + customer.stamps + ' ' + customer.stamps_label + '</strong></p>';
      if (customer.vip_tier_name) {
        html += '<p>VIPティア: ' + customer.vip_tier_name + '</p>';
      }
      if (customer.next_reward) {
        html += '<p>次のリワード: ' + customer.next_reward.name + '（あと' + customer.next_reward.stamps_needed + '必要）</p>';
      }
      html += '</div>';

      // 利用可能なリワード
      html += '<h2>利用可能なリワード</h2>';
      if (rewards.items.length === 0) {
        html += '<p>リワードはまだ設定されていません。</p>';
      }
      rewards.items.forEach(function (r) {
        html += '<div class="reward">';
        html += '<div><strong>' + r.name + '</strong><br><small>' + r.price_label + '</small></div>';
        html += '<button onclick="redeem(' + r.id + ')" id="btn-' + r.id + '">交換する</button>';
        html += '</div>';
      });

      // 獲得済みコード
      if (codes.items.length > 0) {
        html += '<h2>あなたのコード</h2>';
        codes.items.forEach(function (c) {
          html += '<div class="code">';
          html += '<strong>' + c.name + '</strong> &mdash; <code>' + c.code + '</code>';
          html += '</div>';
        });
      }

      app.innerHTML = html;
    });
  }

  function redeem(rewardProductId) {
    var btn = document.getElementById('btn-' + rewardProductId);
    btn.disabled = true;
    btn.textContent = '交換中...';

    appyStamp.redeem(rewardProductId).then(function (result) {
      alert('交換完了！コード: ' + result.code);
      renderPage();
    }).catch(function (err) {
      alert('交換できませんでした: ' + err.message);
      btn.disabled = false;
      btn.textContent = '交換する';
    });
  }
</script>

</body>
</html>
```

## このサンプルがカバーする内容

- レンダリング前に`appy:ready`を待機
- 未認証の場合の処理
- `Promise.all`で複数のデータソースを並列取得
- 顧客残高の表示（カードとスタンプ、合計値ではなく）
- 交換ボタン付きのリワード一覧
- 獲得済みディスカウントコードの表示
- 交換中のボタン無効化
- 交換成功後のページ更新

## 本番環境で追加すべきもの

- `window.APPY_SDK`設定のサーバーサイドレンダリング（ハッシュをハードコードしない）
- ネットワーク障害時のエラーハンドリング
- リワードとコードのページネーション（`has_more`と`next_page`を使用）
- ストアのブランドに合わせたスタイリング
- データ取得中のローディング状態
