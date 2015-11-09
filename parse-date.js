'use strict';

/**
 * Wrapper for parseDate function, enclosing function with scoped `throwFixmeError` argument.
 * @param  {function} throwErrFn Function which is called with ArgumentError if date is invalid.
 * @return {function}            The parseDate function.
 */
function wrap(fixmeError) {
  /**
   * Try to parse given string as a date, throw an error if it's not valid.
   * @param  {string} strDate Date to parse (any format parsable by Date object).
   * @return {Date}           Parsed date.
   */
  return function parseDate(strDate) {
    var date = new Date(strDate);
    // Throw an error if date is invalid.
    if (isNaN(date.valueOf())) {
      fixmeError.throwError(fixmeError.argumentErrorName, 'Date "' + strDate + '" is not valid.');
    }
    return date;
  };
}

module.exports = wrap;
