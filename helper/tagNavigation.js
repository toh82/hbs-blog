module.exports = tagNavigation

var glob = require('glob')
var fs = require('fs')
var _ = require('underscore')
var getDocumentData = require('../lib/read-document-data')

/**
 * @private
 * @param {Array} files
 * @returns {Array}
 */
function getTagList (files) {
  var tagList = []

  files.forEach(function (file) {
    var content = fs.readFileSync(file, 'utf8')
    var tags = getDocumentData(content, 'tags')

    tagList = _.union(tagList, tags.split(','))
  })

  return tagList
}

/**
 * @private
 * @param {Array} tagList
 * @param {object} options
 * @returns {string}
 */
function renderTagList (tagList, options) {
  var tagnavigationhtml = ''
  tagList.forEach(function (value) {
    tagnavigationhtml = tagnavigationhtml + options.fn({title: value})
  })

  return tagnavigationhtml
}

/**
 * @public
 * @param {string} folder
 * @param {object} options
 * @returns {string}
 */
function tagNavigation (folder, options) {
  var files = glob.sync(folder + '/*.html')
  var tagList = getTagList(files)

  return renderTagList(tagList, options)
}
