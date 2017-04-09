module.exports = removeDocumentData

var Through = require('through2')
var Fm = require('front-matter')

/**
 * @returns {void}
 */
function removeDocumentData () {
  return Through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()
    var fmData = Fm(fileContent)

    if (file.isBuffer()) {
      file.contents = new Buffer(fmData.body)
    }

    cb(null, file)
  })
}
