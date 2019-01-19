import Table from './table.js';

export default class Data {
    constructor(root, defaultData) {

        this._data = defaultData;        

        this.root = root;
        this.element = null;  

        this._init();        
    }

    get data() {
        return this._data;
    }

    _createTables() {
        this._tables =  this._data.map((table, index) => new Table(table, index, index+1>2?'result':'input'));
    }

    _init() {

        this._createTables();
    }

    sendInitState(view) {
        view.data = this._tables;
    }

    deleteDataRow(tblIndex, rowIndex) {
        this._tables[tblIndex].deleteRow(rowIndex);
        this.onChangeStateTables(this._tables);
    }

    addDataRow(tblIndex) {
        this._tables[tblIndex].addRow();
        this.onChangeStateTables(this._tables);
    }

    calculate(tblIndex) {
        let newRows = [];
        for (let i = 0; i < this._tables[0].rows.length; i++) {
            if (typeof this._tables[1].rows[i] !== "undefined") {
                newRows = [
                    ...newRows,
                    [
                        (this._tables[0].rows[i][0]+this._tables[1].rows[i][0])/2,
                        (this._tables[0].rows[i][1]+this._tables[1].rows[i][1])/2
                    ]
                ];
            }            
        }
        this._tables[tblIndex].rows = newRows;
        this.onChangeStateTables(this._tables);
    }

    changeTableValue(tblIndex, rowIndex, cellIndex, value) {
        this._tables[tblIndex].changeValue(rowIndex, cellIndex, value);
        this.onChangeStateTables(this._tables);    
    }

    change() {
        this._render();
    }
}