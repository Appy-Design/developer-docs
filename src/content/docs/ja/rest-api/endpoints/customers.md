---
title: 顧客
sidebar:
  order: 6
description: REST API で顧客を一覧・取得・更新します。
---

ショップ内の顧客を読み取り、更新します。

:::note[顧客は Shopify から取り込まれます]
顧客は Shopify で作成され、Appy Stamp に自動的に同期されます。この API は既存の顧客を更新するもので、顧客を作成することはありません。顧客の `{id}` はその Shopify 顧客 ID です。不明な id を更新しようとすると `404 CUSTOMER_NOT_FOUND` を返します。
:::

## 顧客を一覧する

`GET /customers`

カーソルでページネーションされた顧客の一覧です（古い順）。

**クエリパラメータ:**

| パラメータ | 型 | 説明 |
|-------|------|-------------|
| `email` | string | このメールアドレスを持つ顧客のみを返します。 |
| `limit` | integer | ページサイズ、1〜1000（デフォルト 20）。 |
| `after` | string | 次のページ用カーソル。 |
| `before` | string | 前のページ用カーソル。 |
| `hasCount` | boolean | `meta.pagination` に合計 `count` を含める（低速）。 |

詳細は[ページネーション](/ja/rest-api/overview/#ページネーション)を参照してください。

:::note[メールアドレスは一意のキーではありません]
1 つのメールアドレスが複数の顧客に属することがあるため、`email` でフィルタすると複数の顧客が返ることがあります。顧客の識別子は常に Shopify 顧客 ID であり、メールアドレスではありません。
:::

```json
// data
[
  {
    "id": "6677889900",
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "stampBalance": 35,
    "cards": 1,
    "stampsToNextReward": 5,
    "vipTierId": 3,
    "vipTierName": "Gold",
    "dateOfBirth": "09-04",
    "state": "active"
  }
]
// meta.pagination
{
  "hasNext": true,
  "hasPrevious": false,
  "nextCursor": "aWQ6NjY3Nzg4OTkwMA==",
  "previousCursor": "...",
  "count": null
}
```

`dateOfBirth` は `dd-mm` 形式の文字列です。`mergedIntoCustomerId` は、顧客が別の顧客に統合された場合にのみ存在します。

### 顧客のフィールド

すべての顧客エンドポイント（一覧、取得、更新）で返されます。null のフィールドは REST レスポンスから省略されます。

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `id` | string | Shopify 顧客 ID（あらゆる箇所での顧客の識別子）。 |
| `firstName` | string | 顧客の名。 |
| `lastName` | string | 顧客の姓。 |
| `email` | string | 顧客のメールアドレス。 |
| `stampBalance` | integer | 現在の交換可能なスタンプ残高。 |
| `cards` | integer | 完了したスタンプカードの枚数。 |
| `stampsToNextReward` | integer | 次のリワードに到達するまでに必要な残りのスタンプ数。 |
| `stampsExpireAt` | string | スタンプの有効期限が有効な場合に、現在のスタンプ残高が失効する日時（無効な場合は省略）。 |
| `vipTierId` | integer | 現在の VIP ティア ID（ある場合）。 |
| `vipTierName` | string | 現在の VIP ティア名（ある場合）。 |
| `dateOfBirth` | string | 誕生日の日と月を `dd-mm` 形式の文字列で表したもの。 |
| `state` | string | 顧客のロイヤルティの状態。 |
| `mergedIntoCustomerId` | string | 顧客が統合された場合、統合先として残った顧客の ID（それ以外は省略）。 |
| `nextReward` | object | 顧客が次に目指しているリワード（`id` と `name` を含む）。[顧客を取得する](#顧客を取得する)でのみ返されます。 |

### ページネーションのフィールド（`meta.pagination`）

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `hasNext` | boolean | 次のページが続くかどうか。 |
| `hasPrevious` | boolean | 前のページが存在するかどうか。 |
| `nextCursor` | string | 次のページを取得するためのカーソル（`after` として渡す）。 |
| `previousCursor` | string | 前のページ用カーソル（`before` として渡す）。 |
| `count` | integer | 一致するレコードの総数（`hasCount=true` のときのみ。それ以外は `null`）。 |

## 顧客を取得する

`GET /customers/{id}`

Shopify 顧客 ID で単一の顧客（[顧客のフィールド](#顧客のフィールド)を参照）を返すか、`404 CUSTOMER_NOT_FOUND` を返します。このエンドポイントは、一覧エンドポイントでは省略される `nextReward` も返します。

```json
{
  "id": "6677889900",
  "firstName": "Ada",
  "stampBalance": 35,
  "cards": 1,
  "stampsToNextReward": 5,
  "nextReward": { "id": "44", "name": "Free coffee" }
}
```

## 顧客を更新する

`PATCH /customers/{id}`

既存の顧客の誕生日を更新します。ID が不明な場合は `404 CUSTOMER_NOT_FOUND` を返します。

書き込めるのはアプリが管理するフィールドのみです。顧客の名前、メールアドレス、電話番号は Shopify が管理しており、この API では編集できません。

**ボディ:**

| フィールド | 型 | 説明 |
|-------|------|-------------|
| `birthday_month` | integer | 誕生月、1〜12（`birthday_day` とともに送信）。 |
| `birthday_day` | integer | 誕生日、1〜31（`birthday_month` とともに送信）。 |
| `excluded` | boolean | `true` で顧客をロイヤルティプログラムから除外します（`state` が `removed` になります）。`false` で再び対象に含めます。下記を参照してください。 |

`excluded` が `true` の場合、顧客はプログラムの対象外となります。スタンプの獲得、誕生日や記念日の特典、残高の再計算から除外されます。この除外は Shopify が顧客を同期したときも保持され、自動的に解除されることはありません。`excluded` を `false` にすると顧客が再び対象に含まれ、アカウントの状態は実態を反映するよう Shopify から読み戻されます。

```json
{ "excluded": true }
```

更新された顧客オブジェクト（[顧客のフィールド](#顧客のフィールド)を参照）を返します。

## 顧客の VIP ティアを設定する

`POST /customers/{id}/tier`

顧客を VIP ティアに割り当てます。ティアは自身のショップに属している必要があり、そうでない場合は `404 TIER_NOT_FOUND` を返します（不明な顧客の場合は `404 CUSTOMER_NOT_FOUND`）。

デフォルトではティアを設定するだけです。`trigger_rewards` を `true` にすると、管理画面のティア変更にある「このティアのリワードを付与する」にチェックを入れた場合と同様に、ティアに紐づくリワードも発行されます。

**ボディ:**

| フィールド | 型 | 必須 | 説明 |
|-------|------|----------|-------------|
| `tier_id` | integer | yes | 割り当てるティア（`/tiers` の `id`）。 |
| `trigger_rewards` | boolean | no | `true` の場合、ティアのリワードも顧客に発行します。デフォルトは `false`。 |
| `comment` | string | no | この変更に対して記録される、顧客に表示されるメモ。 |
| `internal_comment` | string | no | この変更に対して記録される、スタッフのみのメモ。 |

```json
{ "tier_id": 3 }
```

更新された顧客オブジェクト（[顧客のフィールド](#顧客のフィールド)を参照）を返します。
