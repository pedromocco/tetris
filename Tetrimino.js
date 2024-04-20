function createBaseTetrimino() {
    tetriminosBase = {
        "Z": {
            color: "red",
            map: [
                createVector(),
                createVector(-1, -1),
                createVector(0, -1),
                createVector(1, 0)
            ]
        },
        "S": {
            color: "green",
            map: [
                createVector(),
                createVector(1, -1),
                createVector(0, -1),
                createVector(-1, 0)
            ]
        },
        "J": {
            color: "orange",
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(-1, -1),
                createVector(1, 0)
            ]
        },
        "L": {
            color: "dodgerblue",
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(1, -1),
                createVector(1, 0)
            ]
        },
        "T": {
            color: "magenta",
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(0, -1)
            ]
        },
        "O": {
            color: "yellow",
            map: [
                createVector(),
                createVector(1,0),
                createVector(0,1),
                createVector(1,1)
            ]
        },
        "I": {
            color: "cyan",
            map: [
                createVector(),
                createVector(-1,0),
                createVector(1, 0),
                createVector(2,0)
            ]
        }
    }
}



class Tetrimino {
    constructor(name = random(["Z", "S", "J", "L", "T", "O", "I"]), positionToConfig) {
        this.name = name
        let base = tetriminosBase[name]
        this.color = base.color
        this.map = []
        for (const pmino of base.map) {
            this.map.push(pmino.copy())
        }
        this.position = createVector(int(board.columns / 2), 1)
        this.positionExport = positionToConfig
        this.positionToConfig = this.position

    }

    moveRight() {
        tetrimino.position.x++
        if(this.errorMovement) {
            this.moveLeft()
        }
    }

    moveLeft() {
        tetrimino.position.x--
        if(this.errorMovement) {
            this.moveRight()
        }
    }

    moveDown() {
        tetrimino.position.y += 1 
        if(this.errorMovement) {
            this.moveUp();
                board.storeMino = this;
                tetrimino = new Tetrimino();
        };
    };

    moveUp() {
        tetrimino.position.y--
    }

    rotate() {
        for(const pmino of this.map){
            pmino.set(pmino.y, -pmino.x)
        }
        if(this.errorMovement){
            this.rotateBack()
        }
    }

    rotateBack() {
        for(const pmino of this.map){
            pmino.set(-pmino.y, -pmino.x)
        }
    }

    get errorMovement() {
        let outBoard = !this.inTheBoard;
        return outBoard || this.collisionStoredMinos;
    }

    get collisionStoredMinos() {
       for (const pmino of this.boardMap) {
            if(board.minosStored[pmino.x][pmino.y]){
                return true;
            }
       }
        return false;
    }

    get inTheBoard() {
        for(const pmino of this.boardMap) {
            if(pmino.x < 0) { //Evita salidas por izquierda 
                return false
            }
            
            if(pmino.x >= board.columns) { //Evita salidas por derecha
                return false
            }

            if(pmino.y >= board.rows) { //Evita salidas por abajo
                return false
            }

        }
        return true
    }

    get boardMap() {
        let returning = []
        for (const pmino of this.map) {
            let copy = pmino.copy().add(this.position)
            returning.push(copy)
        }
        return returning
    }

    get canvasMap() {
        let returning = []
        for (const pmino of this.map) {
            let copy = pmino.copy().add(this.position)
            returning.push(board.coordinate(copy.x, copy.y))
        }
        return returning
    }

    draw() {
        push();
        noStroke()
        fill(this.color)
        if(glowOption) {
            drawingContext.shadowBlur = 32
            drawingContext.shadowColor = color(this.color)
        }
        for(const pmino of this.canvasMap) {
            Tetrimino.drawMino(pmino);
        }
        pop();

    }

    static drawMino(pmino) {
        rect(pmino.x, pmino.y, board.cellSide)
        push()
        noStroke()
        fill(255, 255, 255, 160)
        beginShape()
        vertex(pmino.x, pmino.y)
        vertex(pmino.x + board.cellSide, pmino.y)
        vertex(pmino.x + board.cellSide, pmino.y + board.cellSide)
        endShape(CLOSE)
        beginShape()
        fill(0, 0 ,0, 60)
        vertex(pmino.x, pmino.y)
        vertex(pmino.x, pmino.y  + board.cellSide)
        vertex(pmino.x + board.cellSide, pmino.y + board.cellSide)
        endShape(CLOSE)
        pop()
    }
}