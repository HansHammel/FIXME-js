'use strict';

var fixmeError = require('./fixme-error');
var parseDate = require('./parse-date')(fixmeError);
var parseSingleString = require('./parse-single-string')(fixmeError, parseDate);

function extendOpts(defaultOpts) {
  var i, o, key;
  for (i = 1; i < arguments.length; i++) {
    o = arguments[i] || {};
    for (key in defaultOpts) {
      if (o[key] !== undefined) {
        defaultOpts[key] = o[key];
      }
    }
  }
  return defaultOpts;
}

/**
 * Check given date and throw UnfixedError if a fix is due.
 * @param  {object} opts Options passed by user, including label's set date and text.
 */
function checkDate(opts) {
  var isProd = false;
  try {
    isProd = /^prod.+?$/.test(process.env.NODE_ENV);
  } catch (e) {}
  // Skip checks skipProd is set and running in production environment.
  if (opts.skipProd && isProd) return;

  if (new Date() >= opts.date) {
    fixmeError.throwError(fixmeError.unfixedError(opts.date, opts.text));
  }
}

/**
 * Set FIXME mark which will throw an error if a fix is overdue.
 * Possible calls:
 * 	- `FIXME("[date]:[label]"[, opts])`: a single string argument of date and time, split by a `:`.
 * 	- `FIXME("[date]", "[label]"[, opts])`: date string and label, each it's own argument.
 * 	- `FIXME([date], "[label]"[, opts])`: date object and label, each it's own argument.
 * 	With each call, last argument is options, which is optional.
 */
function FIXME() {
  var defaultOpts, opts;
  defaultOpts = {
    // Should throwing an error be skipped when process.env.NODE_ENV is set to production?
    skipProd: true,
    date: undefined,
    text: undefined,
  };

  if ((arguments.length === 1 && typeof arguments[0] === 'string') ||
    (arguments.length === 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'object')) {
    // Call in format `FIXME("[date]:[label]")`.
    opts = extendOpts(defaultOpts, arguments[1], parseSingleString(arguments[0]));
  } else if ((arguments.length === 2 && typeof arguments[0] === 'string') ||
    (arguments.length === 3 && typeof arguments[0] === 'string' && typeof arguments[2] === 'object')) {
    // Call in format `FIXME("[date]", "[label]")`.
    opts = extendOpts(defaultOpts, arguments[2], {
      date: parseDate(arguments[0]),
      text: arguments[1]
    });
  } else if ((arguments.length === 2 && arguments[0] instanceof Date) ||
    (arguments.length === 3 && arguments[0] instanceof Date && typeof arguments[2] === 'object')) {
    // Call in format `FIXME([date], "[label]")`.
    opts = extendOpts(defaultOpts, {
      date: arguments[0],
      text: arguments[1]
    });
  } else {
    fixmeError.throwError(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.');
  }
  checkDate(opts);
}

module.exports = FIXME;
