const _ = require('lodash')
const { Graph } = require('../../src')

describe('Graph', () => {
  let graph1, graph2, graph3

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

    graph3 = new Graph()
    graph3.addVertex('A')
    graph3.addVertex('B')
    graph3.addVertex('C')
    graph3.addVertex('D')
    graph3.addVertex('E')
    graph3.addVertex('F')
    graph3.addVertex('G')
    graph3.addEdge('A', 'B')
    graph3.addEdge('A', 'C')
    graph3.addEdge('A', 'D')
    graph3.addEdge('B', 'C')
    graph3.addEdge('B', 'D')
    graph3.addEdge('C', 'D')
    graph3.addEdge('C', 'E')
    graph3.addEdge('D', 'F')
    graph3.addEdge('F', 'G')
  })

  describe('addVertex', () => {
    it('should return an instance with methods addVertex', () => {
      expect(new Graph().addVertex).toBeDefined()
    })

    it('should add a vertex to the list of vertices', () => {
      const graph = new Graph()
      graph.addVertex('A')
      expect(graph.vertices.includes('A')).toBe(true)
    })
  })

  describe('addEdge', () => {
    it('should return an instance with methods addEdge', () => {
      expect(new Graph().addEdge).toBeDefined()
    })

    it('addEdge() should increase the number of edges', () => {
      const graph = new Graph()
      graph.addVertex('A')
      graph.addVertex('B')
      graph.addEdge('A', 'B')
      expect(graph.edges).toBe(1)
    })

    it('addEdge() should create the required adjacencies', () => {
      const graph = new Graph()
      graph.addVertex('A')
      graph.addVertex('B')
      graph.addEdge('A', 'B')
      expect(_.isEqual(graph.adjacent['A'], ['B'])).toBe(true)
      expect(_.isEqual(graph.adjacent['B'], ['A'])).toBe(true)
    })
  })

  describe('isTherePath', () => {
    it('should find path between A and E in graph1', () => {
      expect(graph1.isTherePath('A', 'E')).toBe(true)
    })

    it('should not find path between A and F in graph1', () => {
      expect(graph1.isTherePath('A', 'F')).toBe(false)
    })

    it('should not be stuck in a loop to find path in circular graph using dfs in graph2', () => {
      expect(graph2.isTherePath('A', 'C')).toBe(true)
    })
  })

  describe('bfs', () => {
    describe('distance', () => {
      it('distance between A and E is 3 in graph1', () => {
        const { distance } = graph1.bfs('A', 'E')
        expect(distance).toBe(3)
      })

      it('distance between A and B is 1 in graph1', () => {
        const { distance } = graph1.bfs('A', 'B')
        expect(distance).toBe(1)
      })

      it('distance between A and F is undefined in graph1', () => {
        const { distance } = graph1.bfs('A', 'F')
        expect(distance).toBe(undefined)
      })

      it('should find the distance between B and F in graph3', () => {
        const { distance } = graph3.bfs('B', 'F')
        expect(distance).toBe(2)
      })

      it('should find a distance between G and E in graph3', () => {
        const { distance } = graph3.bfs('G', 'E')
        expect(distance).toBe(4)
      })
    })

    describe('path', () => {
      it('path between A and E is ABDE in graph1', () => {
        const { path } = graph1.bfs('A', 'E')
        expect(_.isEqual(path, ['A', 'B', 'D', 'E'])).toBe(true)
      })

      it('path between B and E is BDE in graph1', () => {
        const { path } = graph1.bfs('B', 'E')
        expect(_.isEqual(path, ['B', 'D', 'E'])).toBe(true)
      })

      it('should return undefined since path between C and F does not exist in graph1', () => {
        const { path } = graph1.bfs('C', 'F')
        expect(path).toBeUndefined()
      })

      it('should not be stuck in a loop to find path in circular graph using bfs in graph1, should return distance and path', () => {
        const { distance, path } = graph2.bfs('A', 'C')
        expect(distance).toBeDefined()
        expect(path).toBeDefined()
      })

      it('should find a path between G and C in graph3', () => {
        const { path } = graph3.bfs('G', 'C')
        expect(_.isEqual(path, ['G', 'F', 'D', 'C'])).toBe(true)
      })
    })
  })

  describe('dfs', () => {
    describe('distance', () => {
      it('distance between A and E is 3 in graph1', () => {
        const { distance } = graph1.dfs('A', 'E')
        expect(distance).toBe(3)
      })

      it('distance between A and B is 1 in graph1', () => {
        const { distance } = graph1.dfs('A', 'B')
        expect(distance).toBe(1)
      })

      it('distance between A and F is undefined in graph1', () => {
        const { distance } = graph1.dfs('A', 'F')
        expect(distance).toBe(undefined)
      })

      it('should find the distance between B and F in graph3', () => {
        const { distance } = graph3.dfs('B', 'F')
        expect(distance).toBe(3)
      })

      it('should find a distance between G and E in graph3', () => {
        const { distance } = graph3.dfs('G', 'E')
        expect(distance).toBe(6)
      })
    })

    describe('path', () => {
      it('path between A and E is ABDE in graph1', () => {
        const { path } = graph1.dfs('A', 'E')
        expect(_.isEqual(path, ['A', 'B', 'D', 'E'])).toBe(true)
      })

      it('path between B and E is BDE in graph1', () => {
        const { path } = graph1.dfs('B', 'E')
        expect(_.isEqual(path, ['B', 'D', 'E'])).toBe(true)
      })

      it('should return undefined since path between C and F does not exist in graph1', () => {
        const { path } = graph1.dfs('C', 'F')
        expect(path).toBeUndefined()
      })

      it('should not be stuck in a loop to find path in circular graph using dfs in graph1, should return distance and path', () => {
        const { distance, path } = graph2.dfs('A', 'C')
        expect(distance).toBeDefined()
        expect(path).toBeDefined()
      })

      it('should find a path between G and C in graph3', () => {
        const { path } = graph3.dfs('G', 'C')
        expect(_.isEqual(path, ['G', 'F', 'D', 'B', 'A', 'C'])).toBe(true)
      })
    })
  })
})
