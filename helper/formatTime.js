module.exports = formatTime

var moment = require('moment')

/**
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
function formatTime (date, format) {
    var moment = moment(date)
    return moment.format(format)
}