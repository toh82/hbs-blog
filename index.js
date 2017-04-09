var readDocumentData = require('./lib/read-document-data')

var removeDocumentData = require('./gulp/remove-document-data')
var loadDocumentData = require('./gulp/load-document-data')

var articleList = require('./helper/articleList')
var markdown = require('./helper/markdown')
var tagNavigation = require('./helper/tagNavigation')
var formatTags = require('./helper/formatTags')
var formatTime = require('./helper/formatTime')

module.exports = {
  document: {
    gulp: {
      remove: removeDocumentData,
      load: loadDocumentData
    },
    read: readDocumentData
  },
  helper: {
    formatTime: formatTime,
    tagNavigation: tagNavigation,
    formatTags: formatTags,
    articleList: articleList,
    markdown: markdown
  }
}
