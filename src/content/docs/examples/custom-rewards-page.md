---
title: Custom Rewards Page
description: Build a rewards page from scratch using the SDK.
---

This example builds a simple rewards page that shows the customer's balance, available rewards with a redeem button, and their earned codes.

## HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Rewards</title>
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

<div id="app">Loading...</div>

<!-- SDK config (rendered server-side) -->
<script>
  window.APPY_SDK = {
    sdkKey: 'YOUR_SDK_KEY',
    customer: {
      id: 12345,
      email: 'customer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      hash: 'SERVER_COMPUTED_HASH'
    }
  };
</script>
<script src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>

<script>
  var app = document.getElementById('app');

  appyStamp.on('appy:ready', function (data) {
    if (!data.authenticated) {
      app.innerHTML = '<p>Please log in to view your rewards.</p>';
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

      // Balance section
      html += '<div class="balance">';
      html += '<h1>Welcome, ' + customer.first_name + '</h1>';
      html += '<p><strong>' + customer.cards + ' Cards & ' + customer.stamps + ' ' + customer.stamps_label + '</strong></p>';
      if (customer.vip_tier_name) {
        html += '<p>VIP Tier: ' + customer.vip_tier_name + '</p>';
      }
      if (customer.next_reward) {
        html += '<p>Next reward: ' + customer.next_reward.name + ' (' + customer.next_reward.stamps_needed + ' more needed)</p>';
      }
      html += '</div>';

      // Available rewards
      html += '<h2>Available Rewards</h2>';
      if (rewards.items.length === 0) {
        html += '<p>No rewards configured yet.</p>';
      }
      rewards.items.forEach(function (r) {
        html += '<div class="reward">';
        html += '<div><strong>' + r.name + '</strong><br><small>' + r.price_label + '</small></div>';
        html += '<button onclick="redeem(' + r.id + ')" id="btn-' + r.id + '">Redeem</button>';
        html += '</div>';
      });

      // Earned codes
      if (codes.items.length > 0) {
        html += '<h2>Your Codes</h2>';
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
    btn.textContent = 'Redeeming...';

    appyStamp.redeem(rewardProductId).then(function (result) {
      alert('Redeemed! Your code: ' + result.code);
      renderPage(); // refresh the page data
    }).catch(function (err) {
      alert('Could not redeem: ' + err.message);
      btn.disabled = false;
      btn.textContent = 'Redeem';
    });
  }
</script>

</body>
</html>
```

## What this example covers

- Waiting for `appy:ready` before rendering
- Handling the unauthenticated case
- Fetching multiple data sources in parallel with `Promise.all`
- Displaying the customer balance (cards and stamps, not raw total)
- Listing rewards with a redeem button
- Showing earned discount codes
- Disabling the button during redemption
- Refreshing the page after a successful redeem

## What you would add in production

- Server-side rendering of the `window.APPY_SDK` config (never hardcode the hash)
- Error handling for network failures
- Pagination for rewards and codes (use `has_more` and `next_page`)
- Styling that matches your store's brand
- Loading states while data is being fetched
