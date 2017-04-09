module.exports = readDocumentData

var Fm = require('front-matter')

/**
 * @param {string} content
 * @param {string|null} which
 * @returns {object}
 */
function readDocumentData (content, which) {
  which = which || null

  var documentData = Fm(content).attributes

  if (which !== null) {
    return documentData[which]
  }

  return documentData
}
