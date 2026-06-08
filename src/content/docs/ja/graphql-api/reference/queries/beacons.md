---
title: ビーコン
sidebar:
  order: 5
description: "beaconsクエリ: 顧客に表示されるお知らせを取得する。"
---

## `beacons`

ショップに設定されたすべてのビーコン（お知らせ）を返します。引数を取りません。

null非許容の[`Beacon`](/ja/graphql-api/reference/types/)オブジェクトのnull非許容リスト（`[Beacon!]!`）を返します。

### 戻り値 / フィールド

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | `ID!` | 一意の識別子。 |
| `name` | `String` | ビーコン名。 |
| `message` | `String` | 顧客に表示されるお知らせのテキスト。 |
| `icon` | `String` | アイコン識別子。 |
| `active` | `Boolean` | 現在アクティブかどうか。 |

### 例

```graphql
query {
  beacons {
    id
    name
    message
    icon
    active
  }
}
```

```json
{
  "data": {
    "beacons": [
      {
        "id": "7",
        "name": "Double stamps weekend",
        "message": "Earn double beans all weekend!",
        "icon": "sparkles",
        "active": true
      }
    ]
  }
}
```
