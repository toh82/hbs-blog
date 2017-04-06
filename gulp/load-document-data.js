module.exports = loadDocumentData

var through = require('through2')
var extend = require('util')._extend
var readDocumentData = require('../lib/read-document-data')

function loadDocumentData () {
    return through.obj(function (file, enc, cb) {
        var fileContent = file.contents.toString()

        if (!file.data) {
            file['data'] = {}
        }

        extend(
            file.data,
            readDocumentData(fileContent, null)
        )

        cb(null, file)
    })
}
