module.exports = loadDocumentData

var Through = require('through2')
var Extend = require('util')._extend
var ReadDocumentData = require('../lib/read-document-data')

/**
 * @returns {void}
 */
function loadDocumentData () {
  return Through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()

    if (!file.data) {
      file['data'] = {}
    }

    Extend(
      file.data,
      ReadDocumentData(fileContent, null)
    )

    cb(null, file)
  })
}
