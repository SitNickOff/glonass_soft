class Table {
    constructor(data, type) {
        this.element = null;

        this.data = data;
        this.type = type;

        this._init();
    }

    _init() {
        const table = document.createElement('table');

        table.className = 'grid';

        const th = this._tableHeader();

        table.appendChild(th);

        for (let i = 0; i < this.data.length; i++) {
            
            const tr = document.createElement('tr');
            tr.className = 'row';

            for (let j = 0; j < 2; j++) {
                
                const td = document.createElement('td');
                td.className = 'cell';
                td.width = 60;

                const field = document.createElement('input');
                field.width = '50px';
                field.style.width = '50px';
                field.value = this.data[i][j];
                if (this.type === 'result') field.disabled = true;

                td.appendChild(field);
                tr.appendChild(td);
                
            }

            if (this.type==='input') {

                const td = document.createElement('td');
                td.className = 'cell';

                const controls = document.createElement('div');
                controls.className = 'controls';

                const deleteButton = document.createElement('button');
                //deleteButton.className = 'material-icons';
                deleteButton.textContent = 'delete';
                deleteButton.style.margin = 'auto';
                deleteButton.addEventListener('click', () => this.deleteRow(i));

                controls.appendChild(deleteButton);
                td.appendChild(controls);
                tr.appendChild(td);
            }

            table.appendChild(tr);
            
        }

        const tr = document.createElement('tr');
        tr.className = 'row';

        const td = document.createElement('td');
        td.colSpan = 3;
        td.className = 'cell';

        const controls = document.createElement('div');
        controls.className = 'controls';
        

        const actionButton = document.createElement('button');
        //deleteButton.className = 'material-icons';
        actionButton.textContent = this.type==='input'?'Add':'Calculate';
        actionButton.style.flex = 1;
        actionButton.style.margin = 0;
        actionButton.addEventListener('click', () => console.log('Вызываем Action'));

        controls.appendChild(actionButton);
        td.appendChild(controls);
        tr.appendChild(td);
        table.appendChild(tr);


        this.element = table;
    }

    _tableHeader() {
        const tr = document.createElement('tr');
        tr.className = 'row';

        const td1 = document.createElement('td');
        td1.className = 'cell';
        td1.width = 60;
        td1.textContent = 'X';

        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.className = 'cell';
        td2.width = 60;
        td2.textContent = 'Y';

        tr.appendChild(td2);

        if (this.type==='input') {
            const td3 = document.createElement('td');
            td3.className = 'cell';
            td3.width = 60;

            tr.appendChild(td2);
        }

        return tr;

    }

    deleteRow(i) {
        this.data = [
            ...this.data.slice(0, i),
            ...this.data.slice(i + 1)
        ]
        console.log('Удаляем строку: ', (i+1));
    }


}