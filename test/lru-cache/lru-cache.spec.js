const { LRUCache } = require('../../src')

const sleep = (timeoutInMS) =>
  new Promise((resolve) => setTimeout(resolve, timeoutInMS))

describe('LRUCache', () => {
  describe('LRUCache constructor', () => {
    it('should fail if ttl is not defined', () => {
      expect(() => new LRUCache({ itemLimit: 10 })).toThrow(
        'ttl must be a number bigger than 0'
      )
    })

    it('should fail if ttl is not a number', () => {
      expect(() => new LRUCache({ itemLimit: 10, ttl: 'foo' })).toThrow(
        'ttl must be a number bigger than 0'
      )
    })

    it('should fail if ttl is a number but not bigger than 0', () => {
      expect(() => new LRUCache({ itemLimit: 10, ttl: 0 })).toThrow(
        'ttl must be a number bigger than 0'
      )
    })

    it('should fail if itemLimit is not defined', () => {
      expect(() => new LRUCache({ ttl: 500 })).toThrow(
        'itemLimit must be a number bigger than 0'
      )
    })

    it('should fail if itemLimit is not a number', () => {
      expect(
        () =>
          new LRUCache({
            itemLimit: 'foo',
            ttl: 500
          })
      ).toThrow('itemLimit must be a number bigger than 0')
    })

    it('should fail if itemLimit is a number but not bigger than 0', () => {
      expect(
        () =>
          new LRUCache({
            itemLimit: 0,
            ttl: 500
          })
      ).toThrow('itemLimit must be a number bigger than 0')
    })
  })

  describe('LRUCache delete', () => {
    it('should return false if tried to remove key that does not exist', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      expect(lruCache.delete('foo')).toEqual(false)
    })

    it('should return true successfully removed existing entry', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      lruCache.set('foo', 'bar')
      expect(lruCache.delete('foo')).toEqual(true)
      expect(lruCache.get('foo')).toBeUndefined()
    })
  })

  describe('LRUCache has', () => {
    it('should return false for non-existent key and true for existing', () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      expect(lruCache.has('foo')).toEqual(false)
      lruCache.set('foo', 'bar')
      expect(lruCache.has('foo')).toEqual(true)
    })

    it('should return false for evicted key', async () => {
      const lruCache = new LRUCache({ itemLimit: 1, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      expect(lruCache.has('foo')).toEqual(false)
      expect(lruCache.has('baz')).toEqual(true)
    })

    it('should return false for expired key', async () => {
      const lruCache = new LRUCache({ itemLimit: 1, ttl: 500 })
      lruCache.set('foo', 'bar')
      expect(lruCache.has('foo')).toEqual(true)
      await sleep(600)
      expect(lruCache.has('foo')).toEqual(false)
    })

    it('should return true for multiple existing keys', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      expect(lruCache.has('foo')).toEqual(true)
      expect(lruCache.has('baz')).toEqual(true)
    })

    it('should return true for key with TTL extended', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 500 })
      lruCache.set('foo', 'bar')
      await sleep(400)
      expect(lruCache.has('foo')).toEqual(true)
      await sleep(400)
      expect(lruCache.has('foo')).toEqual(true)
    })
  })

  describe('LRUCache get', () => {
    it('should return undefined for non-existent key and a value for existing', () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      expect(lruCache.get('foo')).toBeUndefined()
      lruCache.set('foo', 'bar')
      expect(lruCache.get('foo')).toBe('bar')
    })

    it('should return undefined for evicted key', async () => {
      const lruCache = new LRUCache({ itemLimit: 1, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      expect(lruCache.get('foo')).toBeUndefined()
      expect(lruCache.get('baz')).toEqual('bar')
    })

    it('should return undefined for expired key', async () => {
      const lruCache = new LRUCache({ itemLimit: 1, ttl: 500 })
      lruCache.set('foo', 'bar')
      expect(lruCache.get('foo')).toBe('bar')
      await sleep(600)
      expect(lruCache.get('foo')).toBeUndefined()
    })

    it('should return value for multiple existing keys', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      lruCache.set('foo', 'foo')
      lruCache.set('baz', 'baz')
      expect(lruCache.get('foo')).toEqual('foo')
      expect(lruCache.get('baz')).toEqual('baz')
    })

    it('should return value for key with TTL extended', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 500 })
      lruCache.set('foo', 'bar')
      await sleep(400)
      expect(lruCache.get('foo')).toEqual('bar')
      await sleep(400)
      expect(lruCache.get('foo')).toEqual('bar')
    })
  })

  describe('LRUCache set', () => {
    it('should set record in cache', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('bar', 'foo')
      expect(lruCache.get('foo')).toEqual('bar')
      expect(lruCache.get('bar')).toEqual('foo')
    })

    it('should overwrite previous record in cache with the same key', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('foo', 'baz')
      expect(lruCache.get('foo')).toEqual('baz')
    })

    it('should overwrite previous record in cache with the same key and extend the TTL', async () => {
      const lruCache = new LRUCache({ itemLimit: 10, ttl: 500 })
      lruCache.set('foo', 'bar')
      await sleep(400)
      lruCache.set('foo', 'baz')
      await sleep(400)
      expect(lruCache.get('foo')).toEqual('baz')
    })

    it('should set record while evicting least recently used', async () => {
      const lruCache = new LRUCache({ itemLimit: 2, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      lruCache.set('bar', 'baz')
      expect(lruCache.get('foo')).toBeUndefined()
      expect(lruCache.get('baz')).toEqual('bar')
      expect(lruCache.get('bar')).toEqual('baz')
    })

    it('should take `get` operation into account while evicting least recently used', async () => {
      const lruCache = new LRUCache({ itemLimit: 3, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      lruCache.set('bar', 'baz')
      expect(lruCache.get('foo')).toBe('bar')
      lruCache.set('foobar', 'barbaz')
      expect(lruCache.get('baz')).toBeUndefined()
      expect(lruCache.get('foo')).toBe('bar')
      expect(lruCache.get('bar')).toEqual('baz')
      expect(lruCache.get('foobar')).toEqual('barbaz')
    })

    it('should take `has` operation into account while evicting least recently used', async () => {
      const lruCache = new LRUCache({ itemLimit: 3, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      lruCache.set('bar', 'baz')
      expect(lruCache.has('foo')).toBe(true)
      lruCache.set('foobar', 'barbaz')
      expect(lruCache.get('baz')).toBeUndefined()
      expect(lruCache.get('foo')).toBe('bar')
      expect(lruCache.get('bar')).toEqual('baz')
      expect(lruCache.get('foobar')).toEqual('barbaz')
    })

    it('should take `set` operation into account while evicting least recently used', async () => {
      const lruCache = new LRUCache({ itemLimit: 3, ttl: 50000 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      lruCache.set('bar', 'baz')
      lruCache.set('foo', 'barbaz')
      lruCache.set('foobar', 'barbaz')
      expect(lruCache.get('baz')).toBeUndefined()
      expect(lruCache.get('bar')).toEqual('baz')
      expect(lruCache.get('foo')).toBe('barbaz')
      expect(lruCache.get('foobar')).toBe('barbaz')
    })

    it('should set record without evicting least recently used while TTL is reached', async () => {
      const lruCache = new LRUCache({ itemLimit: 2, ttl: 500 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      await sleep(600)
      lruCache.set('bar', 'baz')
      expect(lruCache.get('foo')).toBeUndefined()
      expect(lruCache.get('baz')).toBeUndefined()
      expect(lruCache.get('bar')).toBe('baz')
    })
  })

  describe('LRUCache keys', () => {
    it('should return an empty array if there are no entries', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      const keys = lruCache.keys()
      expect(keys.length === 0).toBe(true)
      expect(lruCache.keys()).toEqual([])
    })

    it('should return an array with all keys', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      lruCache.set('foo', 'bar')
      const keys = lruCache.keys()
      expect(keys.length === 1).toBe(true)
      expect(keys[0]).toEqual('foo')
    })
  })

  describe('LRUCache size', () => {
    it('should return 0 if there are no entries', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      expect(lruCache.size()).toEqual(0)
    })

    it('should return 5 if there are 5 entries', () => {
      const lruCache = new LRUCache({ itemLimit: 5, ttl: 800 })
      lruCache.set('foo', 'bar')
      lruCache.set('baz', 'bar')
      lruCache.set('bar', 'baz')
      lruCache.set('foo', 'barbaz')
      lruCache.set('foobar', 'barbaz')
      expect(lruCache.size()).toEqual(5)
    })
  })
})

describe('Arbitrary operations', () => {
  it('should behave correctly', async () => {
    const lruCache = new LRUCache({ itemLimit: 3, ttl: 500 })
    expect(lruCache.get('key1')).toBeUndefined()
    lruCache.set('key1', 'value1')
    expect(lruCache.has('key2')).toBe(false)
    lruCache.set('key1', 'value1')
    lruCache.set('key2', 'value2')
    expect(lruCache.get('key1')).toEqual('value1')
    expect(lruCache.get('key2')).toEqual('value2')
    await sleep(400)
    expect(lruCache.get('key2')).toEqual('value2')
    await sleep(400)
    expect(lruCache.has('key1')).toEqual(false)
    expect(lruCache.has('key2')).toEqual(true)
    lruCache.set('key3', 'value3')
    lruCache.set('key1', 'value1')
    lruCache.set('key2', '-value2-')
    lruCache.set('key4', 'value4')
    expect(lruCache.get('key3')).toBeUndefined()
    expect(lruCache.get('key1')).toEqual('value1')
    expect(lruCache.get('key2')).toEqual('-value2-')
    expect(lruCache.get('key4')).toEqual('value4')
  })
})
