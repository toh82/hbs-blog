module.exports = markdown

var remarkable = require('remarkable')

function markdown (options) {
  options = options || {}

  var context = options.fn(this)
  var md = new remarkable()

  md.set({
    html: true,
    breaks: true
  })

  return md.render(context)
}