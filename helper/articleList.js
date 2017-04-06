module.exports = articleList

var glob = require('glob')
var fs = require('fs')
var cheerio = require('cheerio')
var getData = require('../lib/read-document-data')
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
 * @param {string} folder
 * @returns {Array}
 */
function getArticlesFromFolder (folder) {
  var baseFolder = './src/'
  var files = glob.sync(baseFolder + folder + '/*.html')
  var articles = []

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8')
    var $ = cheerio.load(content)

    var documentData = getData(content, null)

    articles.push({
      title: documentData.headline + ' - ' + documentData.subline,
      author: documentData.author,
      intro: $('.main > p.intro').text(),
      link: file.replace(baseFolder, ''),
      lang: $('html').attr('lang'),
      date: documentData.date,
      dateCode: documentData.date,
      tags: documentData.tags
    })
  })

  return articles
}

/**
 * @public
 * @param {string} folder
 * @param {object} options
 * @returns {string}
 */
function articleList (folder, options) {
  var articles = getArticlesFromFolder(folder)

  return renderArticleList(articles, options)
}
