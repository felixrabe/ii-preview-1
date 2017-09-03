const extendSystemJS = (SystemJS) => {
  const SystemJSProto = Object.getPrototypeOf(SystemJS)

  SystemJSProto.forceImport = function (name) {
    this.registry.delete(this.resolveSync(name))
    return this.import(name)
  }

  SystemJSProto.reload = function () {
    const base = this.resolveSync('.');
    ([...this.registry.keys()])
      .filter(key => key.startsWith(base))
      .forEach(key => this.registry.delete(key))
    return this
  }
}

export const __useDefault = extendSystemJS
export default __useDefault
