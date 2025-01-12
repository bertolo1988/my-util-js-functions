const { isNumber } = require('../is-utils')

/**
 * A Least Recently Used (LRU) cache with Time-to-Live (TTL) support. Items are kept in the cache until they either
 * reach their TTL or the cache reaches its size and/or item limit. When the limit is exceeded, the cache evicts the
 * item that was least recently accessed (based on the timestamp of access). Items are also automatically evicted if they
 * are expired, as determined by the TTL.
 * An item is considered accessed, and its last accessed timestamp is updated, whenever `has`, `get`, or `set` is called with its key.
 */

class LRUCache {
  constructor({ ttl, itemLimit }) {
    if (ttl == null || !isNumber(ttl) || ttl <= 0) {
      throw new Error('ttl must be a number bigger than 0')
    }
    if (itemLimit == null || !isNumber(itemLimit) || itemLimit <= 0) {
      throw new Error('itemLimit must be a number bigger than 0')
    }

    this.ttl = ttl
    this.itemLimit = itemLimit
    this.cacheData = new Map()
    this.keysQueueOldestFirst = []
  }

  delete(key) {
    if (this.cacheData.has(key)) {
      this._removeEntryInKeysArray(key)
      this.cacheData.delete(key)
      return true
    }
    return false
  }

  has(key) {
    const keyExists = this.cacheData.has(key)
    if (!keyExists) {
      return false
    } else {
      this._refreshEntryTimestampByKey(key)
      return true
    }
  }

  get(key) {
    const data = this.cacheData.get(key)
    if (data == null) {
      return undefined
    } else {
      this._refreshEntryTimestampByKey(key)
      return data.value
    }
  }

  set(key, value) {
    if (this.keysQueueOldestFirst.length >= this.itemLimit) {
      this._removeOldestEntry()
    }

    this.cacheData.set(key, { value, timestamp: Date.now() })
    this.keysQueueOldestFirst.push(key)

    setTimeout(() => {
      this._scheduledCleanup(key)
    }, this.ttl)
  }

  keys() {
    return this.keysQueueOldestFirst
  }

  size() {
    return this.keysQueueOldestFirst.length
  }

  _scheduledCleanup(key) {
    const data = this.cacheData.get(key)
    if (data != null) {
      const { timestamp } = data
      const timeLived = Date.now() - timestamp
      if (timeLived > this.ttl) {
        this.delete(key)
      } else {
        setTimeout(() => {
          this._scheduledCleanup(key)
        }, this.ttl - timeLived)
      }
    }
  }

  _removeOldestEntry() {
    const oldestKey = this.keysQueueOldestFirst.shift()
    this.cacheData.delete(oldestKey)
  }

  _removeEntryInKeysArray(key) {
    const indexOfKey = this.keysQueueOldestFirst.indexOf(key)
    this.keysQueueOldestFirst.splice(indexOfKey, 1)
  }

  _refreshEntryTimestampByKey(key) {
    const { value } = this.cacheData.get(key)
    this.cacheData.set(key, { value, timestamp: Date.now() })
    this._removeEntryInKeysArray(key)
    this.keysQueueOldestFirst.push(key)
  }
}

module.exports = LRUCache
