import { createElement } from './lib/dom.js';

export default class Graph {
    constructor(width, height, colors) {
        this.width  = width;
        this.height = height;   
        this.colors = colors;    
        
        this._canvas = null;
        this._context = null;

        this.data = null;
        this._createCanvas();        
            
    }

    get element() {
        return this._canvas;
    }

    init(data) {        
        this.data = data;

        this._context.clearRect(0, 0, this.width, this.height);

        this._getLimitPosition();

        this.rows = this.maxValueY - this.minValueY + 2;
        this.cols = this.maxValueX - this.minValueX + 2;

        this.cellWidth = Math.round(this.width / this.cols); 
        this.cellHeight = Math.round(this.height / this.rows);

        this.startX = 0.5;
        this.endX = this.width - 0.5;
        this.startY = 0.5;
        this.endY = this.height - 0.5; 

        this.X0 = this.startX - ((this.minValueX - 1 ) * this.cellWidth);
        this.Y0 = this.startY + ((this.maxValueY + 1 ) * this.cellHeight);

        this._drawGrid();

        this.data.forEach((table, index)=>this._drawGraph(table, this.colors[index]));
    }

    _getLimitPosition() {
        this.maxValueX = null;
        this.minValueX = null;
        this.maxValueY = null;
        this.minValueY = null;
        this.data.forEach(table => {
            table.rows.forEach(row => {
                if (!this.maxValueX||row[0]>this.maxValueX) this.maxValueX = row[0];
                if (!this.minValueX||row[0]<this.minValueX) this.minValueX = row[0];
                if (!this.maxValueY||row[1]>this.maxValueY) this.maxValueY = row[1];
                if (!this.minValueY||row[1]<this.minValueY) this.minValueY = row[1];
            });
        });

        console.log();
    }

    _createCanvas() {
        const canvas = createElement('canvas', {
            className: 'grid',
            width: this.width,
            height: this.height
        });

        this._context = canvas.getContext('2d');
        this._canvas = canvas;
    }

    _drawGraph(table, color) {

        this._context.lineWidth = 3;
        this._context.strokeStyle = color;
        const rows = table.rows

        rows.forEach((point, index)=> {
            if(index>0) {
                this._drawLine(
                    rows[index-1][0] * this.cellWidth + this.X0, this.Y0 - rows[index-1][1] * this.cellHeight, 
                    rows[index][0] * this.cellWidth + this.X0, this.Y0 - rows[index][1] * this.cellHeight
                );
            }
        });
    }

    _drawGrid() {
        this._context.lineWidth = 1;        
        this._context.fillStyle = "#fff";
        this._context.font = "15px Arial";        
        
        for (let i = 1; i < this.rows; i++) {
            const rowY = i * this.cellHeight + 0.5;

            this._context.strokeStyle = '#444';
            this._drawLine(this.startX, rowY, this.endX, rowY);

            this._context.strokeStyle = '#fff';
            this._drawLine(this.X0, rowY, this.X0+5, rowY);
            

            if (this.maxValueY - i + 1!==0){
                this._addTextOrd(this.maxValueY - i + 1, rowY);
            }

            for (let j = 1; j < this.cols; j++) {
                
                const colX = j * this.cellWidth + 0.5;
                
                this._context.strokeStyle = '#444';
                this._drawLine(colX, this.startY, colX, this.endY);


                this._context.strokeStyle = '#fff';
                this._drawLine(colX, this.Y0, colX, this.Y0-5);                

                if (j + this.minValueX -1!==0){
                    this._addTextAbs(j + this.minValueX -1, colX);
                }
            
            }
        }
        

        this._context.strokeStyle = '#fff';
        this._drawLine(this.startX, this.Y0, this.endX, this.Y0);
        this._drawLine(this.X0, this.startY, this.X0, this.endY);

        //this._context.fillText("X", this.endX - 15 , this.Y0 - 15);
        this._addTextAbs("X", this.endX - 15);
        this._context.fillText("Y", this.X0 + 15 , this.startY + 15);
    }

    _addTextAbs(value, position) {
        this._context.textBaseline = "bottom";
        this._context.textAlign = "center";
        this._context.fillText(value , position , this.Y0 - 15);
    }

    _addTextOrd(value, position) {
        this._context.textBaseline = "middle";
        this._context.textAlign = "left";
        this._context.fillText(value , this.X0 + 15 , position);
    }

    _drawLine(x1, y1, x2, y2) {
        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.stroke();
    }
}