if (!Node.prototype.add) {
  Node.prototype.add = function (...args) {
    return this.appendChild(_(...args))
  }
}
