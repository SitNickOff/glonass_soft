export default class Controller {
    constructor(view, data) {
        this.data = data;
        this.view = view;
        

        this.data.onChangeStateTables = tables => view.update(tables);

        this.view.initState = (tables) => data.sendInitState(tables);
        this.view.onClickDelete = (tblIndex, rowIndex) => data.deleteDataRow(tblIndex, rowIndex);
        this.view.onClickAddRow = (tblIndex) => data.addDataRow(tblIndex);
        this.view.onClickCalculate = (tblIndex) => data.calculate(tblIndex);
        this.view.onChangeTableValue = (tblIndex, rowIndex, cellIndex, value) => data.changeTableValue(tblIndex, rowIndex, cellIndex, value);
        this.view.init();
    }
}