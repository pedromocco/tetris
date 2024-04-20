/*
Esta clase se encargará de el tablero del juego 
*/
class Board {
    constructor() {
        this.columns = 10
        this.rows = 20
        this.cellSide = 30
        this.weight = this.columns * this.cellSide
        this.height = this.rows * this.cellSide
        this.position = createVector(boardMargin, boardMargin + this.cellSide)
        this.minosStored = []
        for(let row = 0; row < this.rows; row++) {
            this.minosStored[row] = []
            for(let columns = 0; columns < this.columns; columns++) {
                this.minosStored[row].push("");
            }
        }
    }

    set storeMino(tetrimino) {
        for(const pmino of tetrimino.boardMap) {
            if(pmino.y <= 0) { //Gameover
                if(linesDone > getRecord()) {
                    uptadeRecord(linesDone);
                }
                board = new Board();
                tetrimino = new Tetrimino();
                clearInterval(fallTiming);
                fallTime = 500
                fall(fallTime)
                linesDone = 0
                if(lose){
                    lose.play()
                }
            }
            this.minosStored[pmino.x][pmino.y] = tetrimino.name;
        }
        this.searchToDelete();
        if(place){
            place.play()
        }
    }

    searchToDelete() {
        let lines = [];
        for (let row = this.rows - 1; row >= 0; row--) {
            let add = true;
            for (let column = 0; column < this.columns; column++) {
                if(!this.minosStored[column][row]) {
                    add = false;
                    break;
                }
            }
            if(add) {
                lines.push(row)
            }
        }
        this.deleteHorizontalLines(lines);

    }

    deleteHorizontalLines(lines) {
        linesDone += lines.length;
        for (const line of lines) {
            for (let row = line; row >= 0; row--) {
                for (let column = 0; column < this.columns; column++) {
                    if(row === 0) {
                        this.minosStored[column][row] = "";
                        if(linePoint) {
                            linePoint.play()
                        }
                        if(linesDone > 0 && difficultOption){                     
                            clearInterval(fallTiming);
                            fallTime -= 2.5
                            fall(fallTime)
                        }
                        continue
                    }
                    this.minosStored[column][row] = this.minosStored[column][row - 1];
                }
            }
        }
    }

    /*
    Las coordenadas es una transformación no lineal donde se aplica un
    escalamiento para el ajuste de las medidas y una traslación para
    el ajuste de las posiciones
    */
    coordinate(x, y) {
        return createVector(x, y).mult(this.cellSide).add(this.position)
    }

    /*
    Se encargará del procesamiento lógico
    del dibujado del tablero
    */
    draw() {
        push();
        noStroke();
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                if((column + row) % 2 == 0){
                    fill(5, 5, 5, 40);
                }
                else{
                    fill(5, 5, 5, 50);
                }
                let c = this.coordinate(column, row);
                rect(c.x, c.y, this.cellSide);
            }
        }
        pop();
        this.drawStoredMinos();
    }

    drawStoredMinos() {
        push();
        noStroke()
        for(let column = 0; column < this.columns; column++){
            for(let row = 0; row < this.rows; row++){
                let minoName = this.minosStored[column][row]
                if(minoName){
                    fill(tetriminosBase[minoName].color);
                    Tetrimino.drawMino(this.coordinate(column, row))
                    if(glowOption) {
                        drawingContext.shadowBlur = 32
                        drawingContext.shadowColor = color(tetriminosBase[minoName].color)
                    }
                }
            }
        }
        pop();
    }
}