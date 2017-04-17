module.exports = articleList

var Glob = require('glob')
var Fs = require('fs')
var Cheerio = require('cheerio')
var ReadDocumentData = require('../lib/read-document-data')
var _ = require('underscore')

/**
 * @private
 * @param {object} articles
 * @param {object} options
 * @returns {string}
 */
function renderArticleList (articles, options) {
  if (articles.length === 0) {
    return ''
  }

  articles = _.sortBy(articles, 'dateCode').reverse()

  var articlesHtml = ''
  articles.forEach(function (article) {
    articlesHtml = articlesHtml + options.fn(article)
  })

  return articlesHtml
}

/**
 * @private
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
      tags: documentData.tags
    })
  })

  return articles
}

/**
 * @public
 * @param {string} baseFolder
 * @param {string} folder
 * @param {object} options
 * @returns {string}
 */
function articleList (baseFolder, folder, options) {
  var articles = getArticlesFromFolder(baseFolder, folder)

  return renderArticleList(articles, options)
}
