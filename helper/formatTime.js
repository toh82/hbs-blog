module.exports = formatTime

var Moment = require('moment')

/**
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
function formatTime (date, format) {
  var moment = Moment(date)
  return moment.format(format)
}
