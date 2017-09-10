if (!EventTarget.prototype.on) {
  EventTarget.prototype.on = function (...args) {
    return this.addEventListener(...args)
  }
}

if (!EventTarget.prototype.off) {
  EventTarget.prototype.off = function (...args) {
    return this.removeEventListener(...args)
  }
}
