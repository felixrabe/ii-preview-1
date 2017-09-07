/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable max-statements-per-line */

const extendPromise = (Promise) => {
  Promise.prototype.let = function (n) { return this.then(x => self[n] = x) }
  Promise.prototype.log = function () { return this.then(x => (console.log(x), x)) }
  Promise.prototype.q = function () { return undefined }
}

return extendPromise
