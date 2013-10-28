/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Steve Kaliski
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * @fileoverview Promise based spotify search client.
 * @author Steve Kaliski <sjkaliski@gmail.com>
 */


// Module Dependencies.
var request = require('request')
var exec = require('child_process').exec
var xmlToJSON = require('xml2js').parseString
var prompt = require('prompt')
var colors = require('colors')
var Q = require('kew')


/**
 * Spotify search client.
 * @param {string} search query.
 * @constructor
 */
function SpotifySearch (title) {
  /**
   * @public {Array} tracks.
   */
  this.tracks = []

  // Query spotify, parse xml response, display in terminal,
  // prompt user for track number, play track.
  this._query(title)
  .then(this._parseJSON.bind(this))
  .then(this._printData.bind(this))
  .then(this._promptUser.bind(this))
  .then(this._playTrack.bind(this))
  .fail(this._onError.bind(this))
}


/**
 * Query Spotify api for tracks by query.
 * @param {string} query.
 * @return {Promise}
 * @private
 */
SpotifySearch.prototype._query = function (title) {
  var defer = Q.defer()
  title = title.join(' ')
  console.log(colors.green('Looking up tracks for "' + title + '"...'))
  request('http://ws.spotify.com/search/1/track?q=' + title, defer.makeNodeResolver())
  return defer.promise
}


/**
 * Parse XML response.
 * @param {object} http response.
 * @return {Promise}
 * @private
 */
SpotifySearch.prototype._parseJSON = function (res) {
  var defer = Q.defer()
  var body = res.body
  xmlToJSON(body, defer.makeNodeResolver())
  return defer.promise
}


/**
 * Format and print track data in console.
 * @param {object} track data.
 * @private
 */
SpotifySearch.prototype._printData = function (json) {
  var defer = Q.defer()
  var tracks = this.tracks = json.tracks.track.slice(0, 10)
  var index = 0;
  var maxTitleLength = Math.max.apply(Math, tracks.map(function (t) {
    return t.name[0].length
  }))

  tracks.forEach(function (track) {
    var titleLengthDiff = maxTitleLength - track.name[0].length
    var trackPadding = (titleLengthDiff) == 0 ? ' ' : new Array(titleLengthDiff + 2).join(' ')
    var msg = colors.grey(++index) + (index < 10 ? '  ' : ' ') +
              colors.green(' Name: ') + 
              colors.underline(track.name[0]) + trackPadding +
              colors.green('Artist: ') +
              colors.underline(track.artist[0].name[0])
    console.log(msg)
  })

  defer.resolve()
}


/**
 * Prompt user for track number.
 * @return {Promise}
 */
SpotifySearch.prototype._promptUser = function () {
  var defer = Q.defer()
  prompt.message = prompt.delimiter = ''
  prompt.start()
  prompt.get('Track #', defer.makeNodeResolver())
  return defer.promise
}


/**
 * Play selected track.
 * @param {string} track number.
 * @private
 */
SpotifySearch.prototype._playTrack = function (input) {
  exec('open ' + this.tracks[--input['Track #']]['$'].href)
}


/**
 * Error handler.
 * @param {string|object} error.
 * @private
 */
SpotifySearch.prototype._onError = function (err) {
  console.log(err)
}


/**
 * Module exports.
 */
module.exports = function (title) {
  return new SpotifySearch(title)
}
