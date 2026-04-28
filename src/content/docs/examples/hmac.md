---
title: HMAC Hash Generation
description: Working examples of computing the customer hash in different languages.
---

The HMAC hash proves that the customer data came from your server (not tampered with client-side). You need your **SDK Secret** to compute it. Never expose the secret in frontend code.

## The formula

```
input = sdkKey + email + firstName + customerId + lastName
hash  = HMAC-SHA256(input, sdkSecret)
```

All values are concatenated directly with no separators.

## Full working example (Node.js + Express)

```javascript
const crypto = require('crypto');
const express = require('express');
const app = express();

const SDK_KEY = process.env.APPY_SDK_KEY;
const SDK_SECRET = process.env.APPY_SDK_SECRET;

app.get('/loyalty', (req, res) => {
  // Your customer data (from session, database, etc)
  const customer = {
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };

  const input = SDK_KEY + customer.email + customer.firstName + customer.id + customer.lastName;
  const hash = crypto.createHmac('sha256', SDK_SECRET).update(input).digest('hex');

  res.render('loyalty', {
    sdkKey: SDK_KEY,
    customer: customer,
    hash: hash,
  });
});
```

And in your template:

```html
<script>
  window.APPY_SDK = {
    sdkKey: '<%= sdkKey %>',
    customer: {
      id: <%= customer.id %>,
      email: '<%= customer.email %>',
      firstName: '<%= customer.firstName %>',
      lastName: '<%= customer.lastName %>',
      hash: '<%= hash %>'
    }
  };
</script>
<script async src="https://storage.googleapis.com/scripts.appydesign.io/sdk/v1/appy-stamp-sdk.min.js"></script>
```

## Full working example (PHP)

```php
<?php
$sdkKey = getenv('APPY_SDK_KEY');
$sdkSecret = getenv('APPY_SDK_SECRET');

// Your customer data
$customer = [
    'id' => $user->id,
    'email' => $user->email,
    'firstName' => $user->first_name,
    'lastName' => $user->last_name,
];

$input = $sdkKey . $customer['email'] . $customer['firstName'] . $customer['id'] . $customer['lastName'];
$hash = hash_hmac('sha256', $input, $sdkSecret);
?>

<script>
  window.APPY_SDK = {
    sdkKey: '<?= htmlspecialchars($sdkKey) ?>',
    customer: {
      id: <?= (int) $customer['id'] ?>,
      email: '<?= htmlspecialchars($customer['email']) ?>',
      firstName: '<?= htmlspecialchars($customer['firstName']) ?>',
      lastName: '<?= htmlspecialchars($customer['lastName']) ?>',
      hash: '<?= $hash ?>'
    }
  };
</script>
```

## Debugging hash mismatches

If the SDK returns "Invalid customer hash", check these common issues:

1. **Whitespace.** Make sure there are no leading or trailing spaces on the email, first name, or last name. The SDK trims these server-side.

2. **Order of fields.** The order is: sdkKey, email, firstName, id, lastName. Not alphabetical.

3. **Customer ID type.** The ID must be included as-is (number or string). Make sure you are not accidentally converting it.

4. **Wrong secret.** Make sure you are using the SDK Secret, not the API Secret. These are different keys.

5. **Rotated secret.** If you recently regenerated the secret in Settings > Developers, all existing hashes are invalid. You need to recompute them.

Use the HMAC Calculator in Settings > Developers to generate a known-good hash and compare it with your output.
