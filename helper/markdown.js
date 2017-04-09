module.exports = markdown

var Remarkable = require('remarkable')

/**
 * @param {object} options
 * @returns {*}
 */
function markdown (options) {
  options = options || {}

  var context = options.fn(this)
  var md = new Remarkable()

  md.set({
    html: true,
    breaks: true
  })

  return md.render(context)
}
