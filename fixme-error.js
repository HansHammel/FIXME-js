'use strict';

var argumentErrorName = 'FIXME::ArgumentError';
var unfixedErrorName = 'FIXME::UnfixedError';

/**
 * Instantiate a custumly named error.
 * @param  {string} errName    Name of error.
 * @param  {string} errMessage Message to use for error, same as default Error object.
 */
function factory(errName, errMessage) {
  // Custom error object, call error constructor and set custom name.
  // NOTE: `this.stack` is not set, because it creates obtursive report.
  function FixmeError() {
    var e = Error.apply(this, arguments);
    this.name = errName;
    this.message = e.message;
  }
  // Extend `FixmeError` with `Error`.
  FixmeError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: FixmeError,
      writable: true,
      configurable: true
    }
  });
  // Instantiate new `FixmeError` object with given error message.
  return new FixmeError(errMessage);
}

function unfixedError(date, text) {
  return factory(unfixedErrorName, 'Fix by ' + date.toLocaleDateString() + ': ' + text.trim());
}

function throwError(errName, errMessage) {
  var err = arguments[0] instanceof Error ? arguments[0] : factory(errName, errMessage);
  throw err;
}

module.exports = {
  factory: factory,
  unfixedError: unfixedError,
  throwError: throwError,
  argumentErrorName: argumentErrorName,
  unfixedErrorName: unfixedErrorName
};
