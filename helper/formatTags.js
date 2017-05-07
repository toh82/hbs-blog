module.exports = formatTags

/**
 * @public
 * @param {string} input
 * @param {object} options
 * @returns {string}
 */
function formatTags (input, options) {
  var tags = input.split(',')
  var htmlTagList = ''

  tags.forEach(function (value) {
    htmlTagList = htmlTagList + options.fn({tag: value})
  })

  return htmlTagList
}
