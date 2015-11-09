# FIXME-js [![Build Status](https://travis-ci.org/markogresak/FIXME-js.svg?branch=master)](https://travis-ci.org/markogresak/FIXME-js)

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

### Things to consider

The `FIXME` label is evaluated at runtime, therefore it's call takes some execution time. Based on my simple benchmark with 1M calls, one call takes about 50 µs (0.05 ms) if the exception is thrown or 2 µs (0.002 ms) just to make the check. To some it might not seem like a lot, but it has the potential make a significant impact on performance.

## Contributing

If you spotted a bug or have an idea for improvement, let me know under issues section.

To tinker with the code on your own:

1. clone the repository
2. run `npm install` to get all the dev dependencies (required to run tests)

Code for the `FIXME` module is located within \*.js files tests are inside test/* folder.


### Todo

 - [x] Check support for Node.js environment
 - [ ] Check support for browser environment
