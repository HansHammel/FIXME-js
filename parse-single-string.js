'use strict';

/**
 * Wrapper for parseSingleString function, enclosing function with scoped `throwFixmeError` and `parseDate` arguments.
 * @param  {function} throwErrFn Function which is called with ArgumentError if date is invalid.
 * @param  {function} parseDate  Function used to parse the date.
 * @return {function}            The parseDate function.
 */
function wrap(fixmeError, parseDate) {
  /**
   * Parse an argument of single string in format "[date]:[label]".
   * @param  {string} label Fixme label in fromat mentioned above.
   * @return {object}       Object of parsed data = {date, text}.
   */
  function parseSingleString(label) {
    var splitLabel = label.split(':');
    if (splitLabel.length !== 2) {
      fixmeError.throwError(fixmeError.argumentErrorName, 'Given string is not in format "[date]:[label]".');
    }
    return {
      date: parseDate(splitLabel[0]),
      text: splitLabel[1]
    };
  }
  return parseSingleString;
}

module.exports = wrap;
