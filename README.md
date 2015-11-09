# [FIXME-js](https://www.npmjs.com/package/fixme-js) [![Build Status](https://travis-ci.org/markogresak/FIXME-js.svg?branch=master)](https://travis-ci.org/markogresak/FIXME-js) [![Test Coverage](https://codeclimate.com/github/markogresak/FIXME-js/badges/coverage.svg)](https://codeclimate.com/github/markogresak/FIXME-js/coverage)

FIXME label that will remind you to go back and fix it.

Idea inspired by [fixme for ruby](https://github.com/henrik/fixme).


## Usage

First, you will have to install the module via npm.

``` bash
npm install fixme-js
```

#### In Node.js

``` js
var FIXME = require('fixme-js');
// ...
FIXME('12/31/1999: Close doors of cryogenic pods.');
```

#### In browsers

``` html
<script src="[path/to/node_modules]/fixme-js/dist/fixme.js"></script>
<script>FIXME('12/31/1999: Close doors of cryogenic pods.');</script>
```

And when current date will be past the set date, it will throw an error like this:

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

### Things to consider (i.e. performance)

The `FIXME` label is evaluated at runtime, therefore it's call takes some execution time. Based on my simple benchmark with 1M calls, one call takes about 50 µs (0.05 ms) if the exception is thrown or 2 µs (0.002 ms) just to make the check. To some it might not seem like a lot, but it has the potential make a significant impact on performance.

## Contributing

If you spotted a bug or have an idea for improvement, let me know under issues section.

To tinker with the code on your own:

1. clone the repository
2. run `npm install` to get all the dev dependencies (required to run tests)

Code for the `FIXME` module is located within \*.js files tests are inside test/* folder.
