const _ = require('lodash')
const { Graph } = require('../../src')

describe('Graph', () => {
  let graph1, graph2

  beforeAll(() => {
    graph1 = new Graph()
    graph1.addVertex('A')
    graph1.addVertex('B')
    graph1.addVertex('C')
    graph1.addVertex('D')
    graph1.addVertex('E')
    graph1.addVertex('F')
    graph1.addEdge('A', 'B')
    graph1.addEdge('B', 'C')
    graph1.addEdge('B', 'D')
    graph1.addEdge('D', 'E')

    graph2 = new Graph()
    graph2.addVertex('A')
    graph2.addVertex('B')
    graph2.addVertex('C')
    graph2.addEdge('A', 'B')
    graph2.addEdge('B', 'C')
    graph2.addEdge('C', 'A')
  })

  describe('addVertex', () => {
    it('should return an instance with methods addVertex', () => {
      expect(new Graph().addVertex).toBeDefined()
    })
  })

  describe('addEdge', () => {
    it('should return an instance with methods addEdge', () => {
      expect(new Graph().addEdge).toBeDefined()
    })
  })

  describe('dfs', () => {
    it('should find path between A and E', () => {
      expect(graph1.dfs('A', 'E')).toBe(true)
    })

    it('should not find path between A and F', () => {
      expect(graph1.dfs('A', 'F')).toBe(false)
    })

    it('should not be stuck in a loop to find path in circular graph using dfs', () => {
      expect(graph2.dfs('A', 'C')).toBe(true)
    })
  })

  describe('bfs', () => {
    describe('distance', () => {
      it('distance between A and E is 3', () => {
        const { distance } = graph1.bfs('A', 'E')
        expect(distance).toBe(3)
      })

      it('distance between A and B is 1', () => {
        const { distance } = graph1.bfs('A', 'B')
        expect(distance).toBe(1)
      })

      it('distance between A and F is undefined', () => {
        const { distance } = graph1.bfs('A', 'F')
        expect(distance).toBe(undefined)
      })
    })

    describe('path', () => {
      it('path between A and E is ABDE', () => {
        const { path } = graph1.bfs('A', 'E')
        expect(_.isEqual(path, ['A', 'B', 'D', 'E'])).toBe(true)
      })

      it('path between B and E is BDE', () => {
        const { path } = graph1.bfs('B', 'E')
        expect(_.isEqual(path, ['B', 'D', 'E'])).toBe(true)
      })

      it('should return undefined since path between C and F does not exist', () => {
        const { path } = graph1.bfs('C', 'F')
        expect(path).toBeUndefined()
      })

      it('should not be stuck in a loop to find path in circular graph using bfs, should return distance and path', () => {
        const { distance, path } = graph2.bfs('A', 'C')
        expect(distance).toBeDefined()
        expect(path).toBeDefined()
      })
    })
  })
})
