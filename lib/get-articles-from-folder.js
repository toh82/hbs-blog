module.exports = getArticlesFromFolder

var Glob = require('glob')
var Fs = require('fs')
var Cheerio = require('cheerio')
var ReadDocumentData = require('./read-document-data')
var _ = require('underscore')

/**
 * @public
 * @param {string} baseFolder
 * @param {string} folder
 * @returns {Array}
 */
function getArticlesFromFolder (baseFolder, folder) {
  var files = Glob.sync(baseFolder + folder + '/*.html')
  var articles = []

  files.forEach(function (file) {
    var content = Fs.readFileSync(file, 'utf8')
    var $ = Cheerio.load(content)

    var documentData = ReadDocumentData(content, null)

    articles.push({
      headline: documentData.headline,
      subline: documentData.subline,
      author: documentData.author,
      intro: $('#intro-text').text(),
      link: file.replace(baseFolder, ''),
      lang: documentData.lang,
      date: documentData.date,
      dateCode: documentData.date,
      tags: documentData.tags,
      sticky: documentData.sticky,
      previewImage: documentData.previewImage
    })
  })

  articles = _.sortBy(articles, 'dateCode').reverse()

  return articles
}
