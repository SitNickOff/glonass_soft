import Data from './data.js';
import ViewGraph from './view-graph.js';
import View from './view.js';
import Controller from './controller.js';

const root = document.getElementById('root');

const GRID_WIDTH = 800;
const GRID_HEIGHT = 450;

const colors = ['#ff0000', '#00ff00', '#61dafb'];

const data = new Data(root, [[],[],[]]);

const viewGraph = new ViewGraph(GRID_WIDTH, GRID_HEIGHT, colors);
const view = new View(viewGraph, root, colors);
new Controller(view, data);