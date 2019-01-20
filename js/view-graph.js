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

        this.baseIndexX = 1;

        this.rows = this.maxValueY - this.minValueY + 2;
        this.cols = this.maxValueX - this.minValueX + 2;
        
        if (this.cols-2>20) {
            this.baseIndexX = 2;
            //this.cols = (this.maxValueX - this.minValueX)*this.baseIndexX + 2;
        }

        this.cellWidth = Math.round(this.width / this.cols); 
        this.cellHeight = Math.round(this.height / this.rows);

        this.startX = 0.5;
        this.endX = this.width - 0.5;
        this.startY = 0.5;
        this.endY = this.height - 0.5; 

        this.X0 = this.startX - ((this.minValueX - 1 ) * this.cellWidth);
        this.Y0 = this.startY + ((this.maxValueY + 1 ) * this.cellHeight);

        this.ordPos = this.X0<0.5?0.5:(this.X0>this.width-0.5?this.width-0.5:this.X0);
        this.absPos = this.Y0>this.height-0.5?this.height-0.5:this.Y0;

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
                if (this.maxValueX===null||row[0]>this.maxValueX) this.maxValueX = row[0];
                if (this.minValueX===null||row[0]<this.minValueX) this.minValueX = row[0];
                if (this.maxValueY===null||row[1]>this.maxValueY) this.maxValueY = row[1];
                if (this.minValueY===null||row[1]<this.minValueY) this.minValueY = row[1];
            });
        });
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
        const rows = table.rows

        rows.forEach((point, index)=> {
            this._drawLine(
                this.X0, 
                this.Y0 - point[1] * this.cellHeight, 
                point[0] * this.cellWidth + this.X0, 
                this.Y0 - point[1] * this.cellHeight,
                1,
                color,
                true
            );

            this._drawLine(
                point[0] * this.cellWidth + this.X0, 
                this.Y0, 
                point[0] * this.cellWidth + this.X0, 
                this.Y0 - point[1] * this.cellHeight,
                1,
                color,
                true
            );

            //this._drawPoint(point[0], point[1], 5, color)
            

            if(index>0) {
                this._drawLine(
                    rows[index-1][0] * this.cellWidth + this.X0, 
                    this.Y0 - rows[index-1][1] * this.cellHeight, 
                    rows[index][0] * this.cellWidth + this.X0, 
                    this.Y0 - rows[index][1] * this.cellHeight,
                    3,
                    color
                );
            }
        });
    }

    _drawGrid() {
        
         
        
        
        for (let i = 1; i < this.rows; i++) {
            const rowY = i * this.cellHeight + 0.5;

            this._drawLine(this.startX, rowY, this.endX, rowY, 1, '#444');
            this._drawLine(this.ordPos+5, rowY, this.ordPos-5, rowY, 1, '#fff');
            

            if (this.maxValueY - i + 1!==0){
                this._addTextOrd(this.maxValueY - i + 1, rowY);
            }

            for (let j = 1; j < this.cols; j++) {
                
                const colX = j * this.cellWidth + 0.5;
                
                this._drawLine(colX, this.startY, colX, this.endY, 1, '#444');
                this._drawLine(colX, this.Y0+5, colX, this.Y0-5, 1, '#fff');                

                if (j + this.minValueX -1!==0){
                    let valueAbs = Math.round((j + this.minValueX -1)*100)/100;
                    this._addTextAbs(valueAbs, colX);
                }
            
            }
        }        

        
        this._drawLine(this.startX, this.absPos, this.endX, this.absPos);
        this._drawLine(this.ordPos, this.startY, this.ordPos, this.endY);

        this._addTextAbs("X", this.ordPos === this.width-0.5?this.startX + 5:this.endX - 5 );
        this._addTextOrd("Y", this.absPos === 0.5?this.endY - 5:this.startY + 5 );
    }

    _addTextAbs(value, position, color) {
        this._context.font = "15px Arial";
        this._context.fillStyle = color === undefined?'#fff': color;
        this._context.textBaseline = this.absPos === 0.5?"top":'bottom';
        this._context.textAlign = "center";//absPos

        let textPos = this.absPos === 0.5?(this.absPos + 10):(this.absPos - 10);
        this._context.fillText(value , position , textPos);
    }

    _addTextOrd(value, position, color) {        
        this._context.font = "15px Arial"; 
        this._context.fillStyle = color === undefined?'#fff': color;
        this._context.textBaseline = "middle";
        this._context.textAlign = this.ordPos + 20>this.width?"right":"left";


        let textPos = this.ordPos === this.width-0.5?(this.ordPos - 10):(this.ordPos + 10);
        this._context.fillText(value , textPos , position);
    }

    _drawLine(x1, y1, x2, y2, width, color, dashed) {
        this._context.lineWidth = width === undefined? 1: width;
        this._context.strokeStyle = color === undefined? '#fff': color;
        if (dashed===true)
            this._context.setLineDash([4*width,8*width]);
        else
            this._context.setLineDash([width,0])

        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.stroke();
    }

    _drawPoint(x1, y1, radius, color) {
        this._context.strokeStyle = color === undefined? '#fff': color;  
        this._context.fillStyle = color === undefined?'#fff': color;      

        this._context.beginPath();
        this._context.arc(x1, y1, radius, 0, 2 * Math.PI, true);
        this._context.stroke();
    }

}