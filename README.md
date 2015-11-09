# FIXME-js

FIXME label that will remind you to go back and fix it.

Idea based on [fixme for ruby](https://github.com/henrik/fixme).


## Usage

First, you will have to install the module.

``` bash
npm install fixme-js
```

Next, to use it in your javascript files:

``` js
var FIXME = require('fixme-js');
// ...
FIXME('12/31/1999: Close doors of cryogenic pods.');
```

And when current date will be past the current date, it will throw an error like this:

```
FIXME::UnfixedError: Fix by 12/31/1999: Close doors of cryogenic pods.
```

### Possible calls:

- `FIXME("{date}:{label}" [, opts])`: a single string argument of date and time, split by a `:`
- `FIXME("{date}", "{label}" [, opts])`: date in string format and label
- `FIXME({date}, "{label}" [, opts])`: date as an object and label

The `"{date}"` is any string, which can be parsed into a valid date via JavaScript's `Date.parse` or `new Date`.

For each of this calls, `opts` is an optional object argument of options.

Currently supported options:

 - `skipProd`: If true, throwing an error is skipped in production environments - determined via `process.env.NODE_ENV`. *(default: `true`)*
