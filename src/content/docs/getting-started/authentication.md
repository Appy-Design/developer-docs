---
title: Authentication
description: How to compute the HMAC hash for customer authentication.
---

The SDK uses HMAC-SHA256 to verify customer identity. The hash is computed server-side using your **SDK Secret** (never expose this in client-side code).

## Hash format

The input string is a concatenation of these values in this exact order:

```
sdkKey + email + firstName + customerId + lastName
```

No separators, no spaces between values. The hash is then computed as:

```
HMAC-SHA256(input, sdkSecret)
```

The result is a lowercase hex string (64 characters).

## Examples by language

### Shopify Liquid

```liquid
{% assign sdk_key = 'YOUR_SDK_KEY' %}
{% assign sdk_secret = 'YOUR_SDK_SECRET' %}
{% assign input = sdk_key
  | append: customer.email
  | append: customer.first_name
  | append: customer.id
  | append: customer.last_name %}
{% assign hash = input | hmac_sha256: sdk_secret %}

<script>
  window.APPY_SDK = {
    sdkKey: '{{ sdk_key }}',
    customer: {
      id: {{ customer.id }},
      email: '{{ customer.email | escape }}',
      firstName: '{{ customer.first_name | escape }}',
      lastName: '{{ customer.last_name | escape }}',
      hash: '{{ hash }}'
    }
  };
</script>
```

### PHP

```php
$sdkKey = 'YOUR_SDK_KEY';
$sdkSecret = 'YOUR_SDK_SECRET';

$input = $sdkKey . $customer['email'] . $customer['first_name'] . $customer['id'] . $customer['last_name'];
$hash = hash_hmac('sha256', $input, $sdkSecret);
```

### Node.js

```javascript
const crypto = require('crypto');

const sdkKey = 'YOUR_SDK_KEY';
const sdkSecret = 'YOUR_SDK_SECRET';

const input = sdkKey + customer.email + customer.firstName + customer.id + customer.lastName;
const hash = crypto.createHmac('sha256', sdkSecret).update(input).digest('hex');
```

### Ruby

```ruby
require 'openssl'

sdk_key = 'YOUR_SDK_KEY'
sdk_secret = 'YOUR_SDK_SECRET'

input = sdk_key + customer[:email] + customer[:first_name] + customer[:id].to_s + customer[:last_name]
hash = OpenSSL::HMAC.hexdigest('sha256', sdk_secret, input)
```

### Python

```python
import hmac
import hashlib

sdk_key = 'YOUR_SDK_KEY'
sdk_secret = 'YOUR_SDK_SECRET'

input_str = sdk_key + customer['email'] + customer['first_name'] + str(customer['id']) + customer['last_name']
hash_value = hmac.new(sdk_secret.encode(), input_str.encode(), hashlib.sha256).hexdigest()
```

## Testing your hash

Use the HMAC Calculator in **Settings > Developers** to generate a test hash and compare it with your server-side output. If they match, your implementation is correct.

## Security notes

- The SDK Secret must never appear in client-side code, HTML source, or JavaScript
- The hash is specific to one customer. It cannot be reused for a different customer
- Rotating your SDK Secret (Settings > Developers > Regenerate Secret) invalidates all existing hashes immediately
- The SDK Key is safe to expose in client-side code. It only identifies your shop
