const createGraph = require('ngraph.graph')


module.exports = getGraph

function getGraph() {
  const graph = createGraph({})

  const data = require('./airlines.json')

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  data.nodes.forEach(n => {
    if (n.data.x < minX) minX = n.data.x;
    if (n.data.y < minY) minY = n.data.y;
    if (n.data.x > maxX) maxX = n.data.x;
    if (n.data.y > maxY) maxY = n.data.y;
  })

  data.nodes.forEach(n => {
    graph.addNode(n.id, {
      x: n.data.x - minX,
      y: n.data.y - minY
    })
  })

  data.links.forEach(l => {
    if (!graph.hasLink(l.fromId, l.toId) &&
      !graph.hasLink(l.toId, l.fromId)) {
      graph.addLink(l.fromId, l.toId)
    }
  })

  return graph;
}
