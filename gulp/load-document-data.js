module.exports = loadDocumentData

var Through = require('through2')
var ReadDocumentData = require('../lib/read-document-data')

/**
 * @returns {object}
 */
function loadDocumentData () {
  return Through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()

    if (!file.data) {
      file['data'] = {}
    }

    Object.assign(
      file['data'],
      {relativePath: file.relative},
      ReadDocumentData(fileContent, null)
    )

    cb(null, file)
  })
}
