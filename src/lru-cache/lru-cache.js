/**
 * A Least Recently Used (LRU) cache with Time-to-Live (TTL) support. Items are kept in the cache until they either
 * reach their TTL or the cache reaches its size and/or item limit. When the limit is exceeded, the cache evicts the
 * item that was least recently accessed (based on the timestamp of access). Items are also automatically evicted if they
 * are expired, as determined by the TTL.
 * An item is considered accessed, and its last accessed timestamp is updated, whenever `has`, `get`, or `set` is called with its key.
 *
 * Implement the LRU cache provider here and use the lru-cache.test.ts to check your implementation.
 * You're encouraged to add additional functions that make working with the cache easier for consumers.
 */

export function createLRUCacheProvider({ ttl, itemLimit }) {
  let cacheData = new WeakMap()
  let keysQueueOldestFirst = []

  function scheduledCleanup(key) {
    const { timestamp } = cacheData.get(key)
    const now = new Date().getTime()
    const timeLived = now - timestamp
    if (ttl <= timeLived) {
      keysQueueOldestFirst = keysQueueOldestFirst.filter(
        (queueKey) => queueKey !== key
      )
      cacheData.delete(key)
    } else {
      setTimeout(() => {
        scheduledCleanup(key)
      }, ttl - timeLived)
    }
  }

  return {
    has: (key) => {
      const keyExists = cacheData.has(key)
      if (!keyExists) {
        return false
      } else {
        const { value } = cacheData.get(key)
        const timestamp = new Date().getTime()
        cacheData.set(key, { value, timestamp })
        keysQueueOldestFirst = keysQueueOldestFirst.filter(
          (queueKey) => queueKey !== key
        )
        keysQueueOldestFirst.push(key)
        return true
      }
    },
    get: (key) => {
      const data = cacheData.get(key)
      if (!data) return undefined
      else {
        const timestamp = new Date().getTime()
        cacheData.set(key, { value: data.value, timestamp })
        keysQueueOldestFirst = keysQueueOldestFirst.filter(
          (queueKey) => queueKey !== key
        )
        keysQueueOldestFirst.push(key)
        return data.value
      }
    },
    set: (key, value) => {
      if (keysQueueOldestFirst.length >= itemLimit) {
        const oldestKey = keysQueueOldestFirst.shift()
        cacheData.delete(oldestKey)
      }

      const timestamp = new Date().getTime()
      cacheData.set(key, { value, timestamp })
      keysQueueOldestFirst.push(key)

      setTimeout(() => {
        scheduledCleanup(key)
      }, ttl)
    }
  }
}
