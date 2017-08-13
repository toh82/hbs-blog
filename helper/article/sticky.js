module.exports = articleSticky

var getArticlesFromFolder = require('../../lib/get-articles-from-folder')

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

  var articlesHtml = ''
  articles.forEach(function (article) {
    articlesHtml = articlesHtml + options.fn(article)
  })

  return articlesHtml
}

/**
 * @public
 * @param {string} baseFolder
 * @param {string} folder
 * @param {object} options
 * @returns {string}
 */
function articleSticky (baseFolder, folder, options) {
  var articles = getArticlesFromFolder(baseFolder, folder)
  var stickies = articles.filter(function (article) {
    return article.sticky
  })

  return renderArticleList(stickies, options)
}
