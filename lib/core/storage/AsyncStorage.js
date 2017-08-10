export default class AsyncStorage {
  constructor(storage, prefix) {
    this.storage = storage
    this.prefix = prefix
  }

  clear = async () => {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key)
      }
    }
  }

  getItem = async (key) => {
    return JSON.parse(this.storage.getItem(this.prefix + key))
  }

  hasItem = async (key) => {
    return this.storage.getItem(this.prefix + key) !== null
  }

  keys = async () => {
    const keys = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key.startsWith(this.prefix)) {
        keys.push(key)
      }
    }

    return keys
  }

  setItem = async (key, value) => {
    return this.storage.setItem(this.prefix + key, JSON.stringify(value))
  }

  removeItem = async (key) => {
    this.storage.removeItem(this.prefix + key)
  }
}
