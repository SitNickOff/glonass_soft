import Data from './data.js';
import ViewGraph from './view-graph.js';
import View from './view.js';
import Controller from './controller.js';

const root = document.getElementById('root');

const GRID_WIDTH = 800;
const GRID_HEIGHT = 450;

const colors = ['#ff0000', '#00ff00', '#0000ff'] 

const data1 = [
    [-3, 2],
    [2, 4],
    [4, 6],
    [7, 7]
];

const data2 = [
    [2, -1],
    [4, -1],
    [6, 1],
    [9, 2],
    [11, 4]
];

const data3 = [
    [1.5, 0.5],
    [3, 1.5],
    [5, 3.5],
    [8, 4.5]
];

const data = new Data(root, [data1, data2, data3]);

const viewGraph = new ViewGraph(GRID_WIDTH, GRID_HEIGHT, colors);
const view = new View(viewGraph, root);
new Controller(view, data);