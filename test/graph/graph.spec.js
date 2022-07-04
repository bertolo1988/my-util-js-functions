const _ = require('lodash')
const { Graph } = require('../../src')

describe('Graph', () => {
  let graph

  beforeAll(() => {
    graph = new Graph()
    graph.addVertex('A')
    graph.addVertex('B')
    graph.addVertex('C')
    graph.addVertex('D')
    graph.addVertex('E')
    graph.addVertex('F')
    graph.addEdge('A', 'B')
    graph.addEdge('B', 'C')
    graph.addEdge('B', 'D')
    graph.addEdge('D', 'E')
  })

  describe('dfs', () => {
    it('should find path between A and E', () => {
      expect(graph.dfs('A', 'E')).toBe(true)
    })

    it('should not find path between A and F', () => {
      expect(graph.dfs('A', 'F')).toBe(false)
    })
  })

  describe('bfs', () => {
    describe('distance', () => {
      it('distance between A and E is 3', () => {
        const { distance } = graph.bfs('A', 'E')
        expect(distance).toBe(3)
      })

      it('distance between A and B is 1', () => {
        const { distance } = graph.bfs('A', 'B')
        expect(distance).toBe(1)
      })

      it('distance between A and F is undefined', () => {
        const { distance } = graph.bfs('A', 'F')
        expect(distance).toBe(undefined)
      })
    })

    describe('path', () => {
      it('path between A and E is ABDE', () => {
        const { path } = graph.bfs('A', 'E')
        expect(_.isEqual(path, ['A', 'B', 'D', 'E'])).toBe(true)
      })

      it('path between B and E is BDE', () => {
        const { path } = graph.bfs('B', 'E')
        expect(_.isEqual(path, ['B', 'D', 'E'])).toBe(true)
      })

      it('should return undefined since path between C and F does not exist', () => {
        const { path } = graph.bfs('C', 'F')
        expect(path).toBeUndefined()
      })
    })
  })
})
