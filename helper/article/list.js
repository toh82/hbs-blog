module.exports = articleList

var getArticlesFromFolder = require('../../lib/get-articles-from-folder')

/**
 * @private
 * @param {object} articles
 * @param {boolean} respectSticky
 * @param {object} options
 * @returns {string}
 */
function renderArticleList (articles, respectSticky, options) {
  if (articles.length === 0) {
    return ''
  }

  var stickyHtml = ''
  var articlesHtml = ''
  articles.forEach(function (article) {
    if (respectSticky && article.sticky) {
      stickyHtml = options.fn(article)
      return
    }
    articlesHtml = articlesHtml + options.fn(article)
  })

  return stickyHtml + articlesHtml
}

/**
 * @public
 * @param {string} baseFolder
 * @param {string} folder
 * @param {boolean} respectSticky
 * @param {object} options
 * @returns {string}
 */
function articleList (baseFolder, folder, respectSticky, options) {
  var articles = getArticlesFromFolder(baseFolder, folder)

  return renderArticleList(articles, respectSticky, options)
}
