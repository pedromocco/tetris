const boardMargin = 80
let speedRegulatorLimit = 150
let speedRegulator = 0
let fallRegulator = 0
let linesDone = 0
let reset = 0
let fallTime = 500
let level
let record = getRecord();
let mode; //Determina el menu del juego y sus escenas
/*
Musica y audios del juego
*/
let music = new Audio('./sounds/music.ogg')
let soundLeft = new Audio('./sounds/left2.ogg');
let soundRight = new Audio('./sounds/right2.ogg');
let soundDown = new Audio('./sounds/down.ogg');
let rotate = new Audio('./sounds/rotate2.ogg')
let place = new Audio('./sounds/place.ogg');
let linePoint = new Audio('./sounds/line2.ogg');
let lose = new Audio('./sounds/lose.ogg')

/* 
Dificultad del juego (El tiempo que tardan
en caer las piezas)
*/
function fall(time) {
    fallTiming = setInterval(() => {
    if(millis() - speedRegulator > 200) {
        return
    }
    fallRegulator = millis()
    tetrimino.moveDown()
    }, time);
}

 /*
 Esta función almacena en local el record actual de puntaje del juego
 */
 function getRecord() {
    if (localStorage.getItem("tetrisRecord")) {
      return parseInt(localStorage.getItem("tetrisRecord"));
    } else {
      return 0;
    }
  }
  
  function uptadeRecord(linesDone) {
    if (linesDone > record) {
      localStorage.setItem("tetrisRecord", linesDone);
    }
  }
/*
Esta función se encarga de dibujar puntajes y demás textos en el tablero
*/

function drawPoints() {
    push();
    fill("white");
    textSize(11)
    textFont(font1)
    text(
        "Record ",
        board.position.x - 70,
        board.position.y + 20
        )
    text(
        record,
        board.position.x - 70,
        board.position.y + 35
    )
    text(
        "Puntos ",
        board.position.x - 70,
        board.position.y + 60
        )
    text(
        linesDone,
        board.position.x - 70,
        board.position.y + 75
    )  
    text(
        "Marcha ",
        board.position.x - 70,
        board.position.y + 100
        )
    text(
        fallTime,
        board.position.x - 70,
        board.position.y + 115
    )    
    pop();
}

/*
Función que se encarga de mover los tetriminos
*/


function keyEventsTetris() {
    if (millis() - speedRegulator < speedRegulatorLimit) {
        speedRegulatorLimit = 150
        return
    }

    speedRegulator = millis()

    if(keyIsDown(RIGHT_ARROW)){
        tetrimino.moveRight()
        if(soundRight){
        soundRight.play();
        }
    }
    
    if(keyIsDown(LEFT_ARROW)){
        tetrimino.moveLeft()
        if(soundLeft){
            soundLeft.play();
        }
    }

    if(keyIsDown(DOWN_ARROW)){
        tetrimino.moveDown()
        if(soundDown){
            soundDown.play();
        }
    }

    if(keyIsDown(UP_ARROW)){
        speedRegulatorLimit = 200
        tetrimino.rotate()
        if(rotate){
            rotate.play()
        }
    }

}



function preload() {
    font1 = loadFont("./gameboy.ttf")
    music.loop = true;
}

/*
La función setup es nativa de la libreria de p5js y sirve para ajustar
las propiedades iniciales de nuestros objetos y variables
*/
function setup() {
    mode = 0; //Menú del juego
    createCanvas(900, 600)
    board = new Board()
    createBaseTetrimino()
    tetrimino = new Tetrimino()
    fall(fallTime)
    resizeCanvas(
        board.weight + 2 * boardMargin,
        board.height + 2 * boardMargin + board.cellSide,

    );
}
/*
La función draw es nativa de la libreria de p5js y sirve para dar 
instrucciones de como dibujara el canvas
*/
function draw() {
    clear()
    if(mode == 0) {
        //Menú de inicio
        startMenu();
    }

    if(mode == 1){
        //Juego
        clear()
        drawPoints()
        board.draw()
        tetrimino.draw()
        keyEventsTetris()
        if(musicOption == true) {music.play()}
        if(keyIsDown(27)){
            clear()
            board = new Board();
            tetrimino = new Tetrimino();
            clearInterval(fallTiming);
            fallTime = 500
            fall(fallTime)
            linesDone = 0
            music.pause()
            mode = 0
        }
    }

    if(mode == 2) {
        //Configuración
        configMenu()
    }
}
