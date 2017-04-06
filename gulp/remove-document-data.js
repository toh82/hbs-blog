module.exports = removeDocumentData

var through = require('through2')
var fm = require('front-matter')

function removeDocumentData () {
  return through.obj(function (file, enc, cb) {
    var fileContent = file.contents.toString()
    var fmData = fm(fileContent)

    if (file.isBuffer()) {
      file.contents = new Buffer(fmData.body)
    }

    cb(null, file)
  })
}
