---
title: JavaScript API
sidebar:
  order: 1
description: Open, close, and toggle the loyalty widget from your own storefront.
---

The loyalty widget exposes a small global function, `window._asl(...)`, that lets you control it from your own theme — for example, opening it from a navigation link instead of the built-in launcher button.

The widget must already be installed (via the Appy Stamp app) and eligible to display on the page. If the widget isn't set to show for the current page or customer, these calls have no visible effect.

## Open the widget

```javascript
window._asl('open');
```

From a navigation link:

```html
<a href="#" onclick="window._asl('open'); return false;">Rewards</a>
```

## Close the widget

```javascript
window._asl('close');
```

## Toggle the widget

There is no single toggle call, so check the current state first:

```javascript
function toggleRewards() {
  var frame = document.querySelector('.stamped-launcher-frame-container');
  var isOpen = frame && frame.classList.contains('stamped-launcher-open');
  window._asl(isOpen ? 'close' : 'open');
}
```

## Open automatically via URL

Add `?stamp=open` to any URL and the widget opens on load (when it's eligible to display). Useful for "view your rewards" links in emails or from other pages:

```
https://your-store.com/account?stamp=open
```

:::note[Calls before the widget finishes loading are safe]
`window._asl(...)` queues calls made before the widget has fully loaded and replays them once it's ready, so you don't need to wait for a "ready" event.
:::

:::caution[Use only the documented calls]
Only `open`, `close`, and `?stamp=open` are supported for storefront use. Other internal functions exist but may change without notice — please don't rely on them.
:::
