class Graph {
  constructor() {
    this.vertices = []
    this.adjacent = {}
    this.edges = 0
  }

  addVertex(v) {
    this.vertices.push(v)
    this.adjacent[v] = []
  }

  addEdge(v, w) {
    this.adjacent[v].push(w)
    this.adjacent[w].push(v)
    this.edges++
  }

  bfs(goal, root = this.vertices[0]) {
    let adj = this.adjacent

    const queue = []
    queue.push(root)

    const discovered = []
    discovered[root] = true

    const edges = []
    edges[root] = 0

    const predecessors = []
    predecessors[root] = null

    const buildPath = (goal, root, predecessors) => {
      const stack = []
      stack.push(goal)
      let u = predecessors[goal]
      while (u != root) {
        stack.push(u)
        u = predecessors[u]
      }
      stack.push(root)
      return stack
    }

    while (queue.length) {
      let v = queue.shift()
      if (v === goal) {
        return {
          distance: edges[goal],
          path: buildPath(goal, root, predecessors)
        }
      }
      for (let i = 0; i < adj[v].length; i++) {
        if (!discovered[adj[v][i]]) {
          discovered[adj[v][i]] = true
          queue.push(adj[v][i])
          edges[adj[v][i]] = edges[v] + 1
          predecessors[adj[v][i]] = v
        }
      }
    }
    return false
  }

  isTherePath(goal, v = this.vertices[0], discovered = []) {
    let adj = this.adjacent
    discovered[v] = true
    for (let i = 0; i < adj[v].length; i++) {
      let w = adj[v][i]

      if (!discovered[w]) {
        this.isTherePath(goal, w, discovered)
      }
    }
    return discovered[goal] || false
  }

  dfs(goal, v = this.vertices[0], path = []) {
    let adj = this.adjacent
    path.push(v)
    if (path.includes(goal)) {
      return { distance: path.length - 1, path: path.reverse() }
    }
    for (let i = 0; i < adj[v].length; i++) {
      let w = adj[v][i]
      if (!path.includes(w)) {
        return this.dfs(goal, w, [...path])
      }
    }
    return { distance: undefined, path: undefined }
  }
}

module.exports = { Graph }
