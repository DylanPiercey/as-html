'use strict'

var escapeHTML = require('escape-html')
module.exports = html

/**
 * Converts a quasi literal to safe html, with support for arrays.
 * Inspired by http://www.2ality.com/2015/01/template-strings-html.html
 *
 * Substitutions are escaped by default but can be raw html if preceded with a bang.
 */
function html (literals /* substitutions... */) {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  var raw = literals.raw
  var result = ''

  for (var i = 1, len = arguments.length, sub, lit; i < len; i++) {
    // Retrieve the literal section preceding
    // the current substitution (arguments are offset by 1)
    lit = raw[i - 1]
    // Pullout the current substitution from arguments.
    sub = arguments[i]

    // Flatten arrays to strings.
    if (Array.isArray(sub)) sub = sub.join('')

    // Allow safe html override by prefixing interpolation with a bang.
    // Html is sanitized by default.
    if (lit[lit.length - 1] === '!') {
      lit = lit.slice(0, -1)
    } else {
      sub = escapeHTML(sub)
    }

    result += lit + sub
  }

  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]

  return result
}
