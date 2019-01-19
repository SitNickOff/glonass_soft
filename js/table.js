export default class Table {
    constructor(data, index, type) {
        this.rows = data;
        this.type = type;
        this.index = index;

        this._init();
    }

    _init() {
        
    }


    deleteRow(rowIndex) {
        this.rows = [
            ...this.rows.slice(0, rowIndex),
            ...this.rows.slice(rowIndex + 1)
        ]
    }

    addRow() {
        let lastRowIndex = this.rows.length-1;
        if (this.rows.length>0) {
            let row = this.rows[lastRowIndex]
            this.rows = [...this.rows, [row[0],row[1]]];
        } else {
            this.rows =[...this.rows,[0,0]];
        }        
    }

    changeValue(rowIndex, cellIndex, value) {

        this.rows = this.rows.map((row, i)=> {
            if (rowIndex===i) {                
                return row.map((cell, j)=>{
                    if (j===cellIndex) 
                        return value;
                    
                    return cell;
                });
            }
            return row;
        });
    }


}