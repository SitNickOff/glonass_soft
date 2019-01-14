class Data {
    constructor(root) {

        const data1 = [
            [1, 2],
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

        this.table1 = new Table(data1, 'input');
        this.table2 = new Table(data2, 'input');
        this.table3 = new Table(data3, 'result');

        this.root = root;
        this.element = null;

        this._init();        
    }

    _init() {
        const dataElement = document.createElement('div');

        dataElement.className = 'data';

        this.element = dataElement;

        this._render();
    }

    _render() {
        this.element.append(this.table1.element, this.table2.element, this.table3.element);

        root.appendChild(this.element);
    }
}