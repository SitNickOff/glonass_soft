import Data from './data.js';
import Graph from './graph.js'

const root = document.getElementById('root');

const data = new Data(root);
const graph = new Graph(root);

console.log(data);
console.log(graph);