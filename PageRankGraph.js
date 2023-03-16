

class PRGraph{

     // Initialize the graph with a node and a edge node
     constructor() {
          this.pr_nodes = new Set()
          this.pr_edges = new Map()
     }
     
     // Set the edges between node. this is directional.
     // need to check if a node is already set to a
     setEdge(firstNode, secondNode) {
          if (!this.pr_nodes.has(firstNode)) {
               this.pr_nodes.add(firstNode)
               this.pr_edges.set(firstNode, [])
          }else if (!this.pr_nodes.has(secondNode)) {
               this.pr_nodes.add(secondNode)
               this.pr_edges.set(secondNode, [])
          }
          this.pr_edges.get(firstNode).push(secondNode)
     }


     /***
      *  research:
      *** the initial pagerank for a node is 1/numberofnodes; i.e, if there are 4 nodes, the initial pr for all of them is 1/4 = 0.25
      *** damping factor is usually {0.85}
      *** with pagerank, the iterations per node always converge but 
       it is difficult to tell teh number of iteration but it always converges. so let's set the max number of iterations to a constant value that since it would converge
       say {100}
      * 
      * 
      * 
     PageRank Formular
     PR(A) = [(1-d)/N] + d[{PR(B)/L(B)} + {PR(C)/L(C)} + {PR(D)/L(D)} + ... ]
     
 */

     pageRank() {
          const MAX_ITR = 100
          const INITIAL_PR = 1/(this.pr_nodes.size)
          const DAMPING_FACTOR = 0.85

          let pageRanker = new Map()
          let outerLinker = new Map()


          // Set the initial PR value for each node
          for (let newNode of this.pr_nodes) {
               pageRanker.set(newNode, INITIAL_PR)
               outerLinker.set(newNode, this.pr_edges.get(newNode).length)
          }

          // calculate PR
          // for the first - max-itr iterations, create a new PR for all the nodes and perform calculate the pr value for each of the them
          for (let index = 0; index < MAX_ITR; index++) {
               let newPR = new Map()
               let maxDiff = 0

               // Perform this calculation:
               // PR(A) = [(1-d)/N] + d[{PR(B)/L(B)} + {PR(C)/L(C)} + {PR(D)/L(D)} + ... ]
               for (let node of this.pr_nodes) {
                    let pr_value = (1-DAMPING_FACTOR)/this.pr_nodes.size
                    let temp_pr_value = 0

                    for (let iNode of this.getIncomingNodes(node)) {
                         temp_pr_value += pageRanker.get(iNode) / outerLinker.get(iNode)
                    }
                    pr_value += DAMPING_FACTOR * temp_pr_value
                    newPR.set(node, pr_value)

                    maxDiff = Math.max(maxDiff, Math.abs(pr_value - pageRanker.get(node)))
               }

               pageRanker = newPR

               // least appreciable value should be 0.0001 otherwise the value might get smaller
               if (maxDiff < 0.0001) {
                    break
               }
               
          }

          return pageRanker
     }



     getIncomingNodes(node) {
          let incomingNodes = []
          
          for (let [source, target] of this.pr_edges) {
               if (target.includes(node)) {
                    incomingNodes.push(source)
               }
          }

          return incomingNodes
     }
}


// Example
const graph = new PRGraph();
graph.setEdge('A', 'B');
graph.setEdge('B', 'D');
graph.setEdge('B', 'C');
graph.setEdge('C', 'E');
graph.setEdge('D', 'A');
graph.setEdge('E', 'B');
const pageRank = graph.pageRank();
console.log(pageRank); 