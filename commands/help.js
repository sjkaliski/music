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
 * @fileoverview Help screen.
 * @author Steve Kaliski <sjkaliski@gmail.com>
 */


/**
 * Module exports.
 */
module.exports = function () {
  var artists = ['drake', 'j cole', 'kanye west', 'kendrick lamar']
  var artist = artists[Math.floor(Math.random() * artists.length)]

  console.log('')
  console.log('1. spotify play', artist)
  console.log('2. Input which track (by number) that you want to play.')
  console.log('3. Crank the volume.')
  console.log('')
}
