module.exports = formatTags

function formatTags (input) {
  var tags = input.split(',')
  var htmlTagList = ''

  tags.forEach(function (value) {
    htmlTagList = htmlTagList + '<li class="tags__item">' + value + '</li>'
  })

  return htmlTagList
}
