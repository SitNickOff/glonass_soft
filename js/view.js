import { createElement } from './lib/dom.js';

export default class View {
    constructor(viewGraph, rootElement){
        this.viewGraph = viewGraph;
        this.dataControls = null;
        this.rootElement = rootElement;

        this.onClickDelete = Function.prototype;
    }

    init() {
        this._getInitState();
        this._createDataContriols(this.data);
        this.viewGraph.init(this.data);
        this._render();
    }

    update(data) {
        this._createDataContriols(data);
        this._render();
        this.viewGraph.init(this.data);
    }

    _getInitState() {
        this.initState(this);
    }

    _createDataContriols(data) {
    
        const tbls = data.map((data, index) => {

            const th = this._tableHeader(data.type);
            let trs = [th];        

            for (let i = 0; i < data.rows.length; i++) {   
                
                let tds = [];

                for (let j = 0; j < 2; j++) {              
                    
                    const field = createElement('input', {
                        width: '50px',
                        style: 'flex: 1; width: 100%;',
                        value: data.rows[i][j],
                        disable: data.type === 'result'?true:false,
                        tblIndex: index,
                        rowIndex: i,
                        cellIndex: j,
                        oninput: (event) => this._handleChangeValue(event)                        
                    });
                    const td = createElement('td', {className: 'cell', style: 'width: 70px;  padding: 5px;'}, field);

                    tds = [...tds, td]  
                }      

                if (data.type==='input') { 
                    const deleteButton = createElement('button', {
                        textContent: 'delete', 
                        style: 'margin: auto;',
                        className: 'delete',
                        tblIndex: index,
                        onclick: event => this._handleDeleteRow(event)
                    });
                    const controls = createElement('div', {className: 'controls'}, deleteButton);
                    const td = createElement('td', {className: 'cell', style: 'padding: 5px;'}, controls);

                    tds = [...tds, td]
                }

                const tr = createElement('tr', {className: 'row'}, ...tds);
                trs = [...trs, tr];
            }       

            const actionButton = createElement('button', {
                textContent:  data.type==='input'?'Add':'Calculate',
                style: 'flex: 1; margin: 0;',
                tblIndex: index,
                btnAction: data.type==='input'?'add':'calculate',
                onclick: (event) => this._handleActionEvent(event)
            });
            const controls = createElement('div', {className: 'controls'}, actionButton); 
            const td = createElement('td', {colSpan: 3, className: 'cell', style: 'padding: 5px'}, controls);
            const tr = createElement('tr', {className: 'row'}, td);
            trs = [...trs, tr];   

            return createElement('table', {className: 'table', style: 'max-width: 210px; margin: auto'}, ...trs);
        });

        this.dataControls = createElement('div', {style: 'display: flex; margin: auto; width: 800px;'}, ...tbls);
    }

    _tableHeader(type) {
        

        const td1 = createElement('td', {className: 'cell', width: 60, textContent: 'X', style: 'padding: 5px; text-align: center;'});
        const td2 = createElement('td', {className: 'cell', width: 60, textContent: 'Y', style: 'padding: 5px; text-align: center;'});

        const tr = createElement('tr', {className: 'row'}, td1, td2);

        if (type==='input') {
            const td3 = createElement('td', {className: 'cell', width: 60});

            tr.appendChild(td3);
        }

        return tr;

    }

    _render() {
        if(this.rootElement.children.length>0)
            this.rootElement.childNodes.forEach(child => {
                child.parentNode.removeChild(child);
            });
        
        this.rootElement.appendChild(this.dataControls);
        this.rootElement.appendChild(this.viewGraph.element);        
    }

    _handleActionEvent(event) {
        const tblIndex = event.target.tblIndex;
        console.log(event.target.btnAction);
        if (event.target.btnAction === 'add')
            this.onClickAddRow(tblIndex);

        if (event.target.btnAction === 'calculate')
            this.onClickCalculate(tblIndex);
    }

    _handleDeleteRow(event) {
        const rowIndex = event.target.parentNode.parentNode.parentNode.rowIndex;
        const tblIndex = event.target.tblIndex;
        this.onClickDelete(tblIndex, rowIndex-1);
    }

    _handleChangeValue(event) {
        const tblIndex = event.target.tblIndex;
        const rowIndex = event.target.rowIndex;
        const cellIndex = event.target.cellIndex;
        const value = +event.target.value===NaN?0:+event.target.value;
        console.log(event.target.tblIndex, event.target.rowIndex, event.target.cellIndex, +event.target.value);
        this.onChangeTableValue(tblIndex, rowIndex, cellIndex, value);
    }
}