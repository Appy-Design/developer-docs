---
title: ビーコン
sidebar:
  order: 5
description: REST API でアクティブなオンサイトビーコンとお知らせを一覧します。
---

アクティブなオンサイトビーコン／お知らせです。

## ビーコンを一覧する

`GET /beacons`

アクティブなオンサイトビーコン／お知らせです。

```json
[
  {
    "id": "7",
    "name": "Double stamps weekend",
    "message": "Earn 2x this weekend!",
    "icon": "star",
    "active": true
  }
]
```

### ビーコンのフィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | 一意の識別子。 |
| `name` | string | 表示名。 |
| `message` | string | 顧客に表示されるお知らせのテキスト。 |
| `icon` | string | アイコン識別子。 |
| `active` | boolean | ビーコンが現在アクティブかどうか。 |
