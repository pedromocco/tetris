/*
Esta función se encargará de hacer la escena de configuración
*/

let musicOption = true;
let soundsOption = true;
let difficultOption = true;
let glowOption = true;
let musicMessage = "Musica:   Activada";
let soundsMessage = "Sonidos:   Activada";
let difficultMessage = "Autovelocidad:  Activada";
//let boardRows = document.getElementsByClassName(this.rows)

/*


MENUS DEL JUEGO



 */

//Menú principal

function startMenu() {

    //Menu del juego
    clear();
    push()
    fill("rgba(255, 255, 255, fade)");
    textSize(60)
    textFont(font1)
    //stroke("white")
    //strokeWeight("4")
    text(
        "TETRIS", 
        300 / 2 - 80,
        600 / 2 
        )
    pop()

    //Botón 1

    fill("rgba(0, 0, 255, 0.05)");
    noStroke()
    rect(
        140,
        372 ,
        200,
        50,
        8
    )

    fill("rgba(255, 255, 255, 1)")
    textSize(15)
    textFont(font1)
    text(
        "Comenzar",
        300 / 2 + 30,
        600 / 2 + 102
    )

    //Botón 2
    
    fill("rgba(0, 0, 255, 0.05)");
    noStroke()
    rect(
        160,
        435,
        160,
        40,
        8
    )

    fill("rgba(255, 255, 255, 1)")
    textSize(10)
    textFont(font1)
    text(
        "Configuracion",
        300 / 2 + 26,
        600 / 2 + 159
    )

    //Botón 3
    
    fill("rgba(0, 0, 255, 0.05)");
    noStroke()
    rect(
        160,
        488,
        160,
        40,
        8
    )

    fill("rgba(255, 255, 255, 1)")
    textSize(10)
    textFont(font1)
    text(
        "Salir",
        300 / 2 + 63,
        600 / 2 + 211
    )

    if(mouseX >= 160 && mouseX <= 370 && mouseY >= 370 && mouseY <= 420 && mouseIsPressed == true) {
        mode = 1
    }
    
    if(mouseX >= 160 && mouseX <= 370 && mouseY >= 435 && mouseY <= 475 && mouseIsPressed == true) {
        mode = 2
    }

    if(mouseX >= 160 && mouseX <= 370 && mouseY >= 488 && mouseY <= 448 && mouseIsPressed == true) {
        mode = 0
    }
}

//Menú de configuración

function configMenu() {
    clear();
    push()
    fill("white");
    textSize(30)
    textFont(font1)
    text(
        "Configuracion", 
        300 / 2 - 110,
        600 / 2 - 150 )

    textSize(15)
    textFont(font1)
    text(
        "Filas: " + board.rows,
        300 / 2 - 110,
        600 / 2 - 90 
    )

    text(
        "Columnas: " + board.columns,
        300 / 2 - 110,
        600 / 2 - 70 
    )

    text(
        musicMessage,
        300 / 2 - 110,
        600 / 2 - 50 
    )

    text(
        soundsMessage,
        300 / 2 - 110,
        600 / 2 - 30 
    )

    text(
        difficultMessage,
        300 / 2 - 110,
        600 / 2 - 10 
    )

    let tetriminoConfigZ = new Tetrimino(name = "Z")
    let tetriminoConfigS = new Tetrimino(name = "S")
    let tetriminoConfigJ = new Tetrimino(name = "J")
    let tetriminoConfigL = new Tetrimino(name = "L")
    let tetriminoConfigT = new Tetrimino(name = "T")
    let tetriminoConfigO = new Tetrimino(name = "O")
    let tetriminoConfigI = new Tetrimino(name = "I")


    tetriminoConfigZ.position.x = 0
    tetriminoConfigZ.position.y = 8

    tetriminoConfigS.position.x = 4
    tetriminoConfigS.position.y = 8

    tetriminoConfigJ.position.x = 8
    tetriminoConfigJ.position.y = 8

    tetriminoConfigL.position.x = 0
    tetriminoConfigL.position.y = 12

    tetriminoConfigT.position.x = 4
    tetriminoConfigT.position.y = 12

    tetriminoConfigO.position.x = 7
    tetriminoConfigO.position.y = 11

    tetriminoConfigI.position.x = 0
    tetriminoConfigI.position.y = 16

    tetriminoConfigZ.draw()
    tetriminoConfigS.draw()
    tetriminoConfigJ.draw()
    tetriminoConfigL.draw()
    tetriminoConfigT.draw()
    tetriminoConfigO.draw()
    tetriminoConfigI.draw()
    

    //Botones

    //Sumar y restar filas
        //Boton de restar
        fill("white")
        circle(180, 204, 13)
        fill("black")
        textSize(20)
        textFont('Courier New');
        text("-", 174, 210)

        //Boton de sumar
        fill("white")
        circle(200, 204, 13)
        fill("black")
        textFont('Courier New');
        text("+", 194, 210)

    //Sumar y restar columnas
        //Boton de restar
        fill("white")
        circle(220, 224, 13)
        fill("black")
        textSize(20)
        textFont('Courier New');
        text("-", 214, 230)

        //Boton de sumar
        fill("white")
        circle(240, 224, 13)
        fill("black")
        textFont('Courier New');
        text("+", 234, 230)

        //Boton de activar música
        fill(musicOn())
        circle(151, 244, 13)

        //Boton de activar sonidos
        fill(soundsOn())
        circle(165, 264, 13)

        //Boton de activar autovelocidad
        fill(difficultOn())
        circle(253, 284, 13)
    
        //Botón de Glow

        fill("rgba(0, 0, 255, 0.05)");
        noStroke()
        rect(
            240,
            585,
            160,
            40,
            8
        )
    
        fill("rgba(255, 255, 255, 1)")
        textSize(10)
        textFont(font1)
        text(
            "Glow",
            300,
            610
        )

        //Botón de salir
    
        fill("rgba(0, 0, 255, 0.05)");
        noStroke()
        rect(
            160,
            688,
            160,
            40,
            8
        )
    
        fill("rgba(255, 255, 255, 1)")
        textSize(10)
        textFont(font1)
        text(
            "Regresar",
            300 / 2 + 53,
            600 / 2 + 411
        )
        
        if(mouseX >= 157 && mouseX <= 370 && mouseY >= 684 && mouseY <= 728 && mouseIsPressed == true) {
            mode = 0
        }

}   
    
// Funcionalidades
function mousePressed() {
    //botones de columnas
        //Resta
        if(mouseX >= 217 && mouseX <= 228 && mouseY >= 221 && mouseY <= 232) {
            board.columns -= 1
        }

        //Suma
        if(mouseX >= 237 && mouseX <= 248 && mouseY >= 221 && mouseY <= 232) {
            board.columns += 1
        }
    //botones de filas
        //Resta
        if(mouseX >= 177 && mouseX <= 188 && mouseY >= 198 && mouseY <= 213) {
                board.rows -= 1
        }

        //Suma
        if(mouseX >= 195 && mouseX <= 219 && mouseY >= 198 && mouseY <= 213) {
            if(board.rows >= 10) {
                board.rows += 1
            }
        }

    //botón de música
    if(mouseX >= 148 && mouseX <= 159 && mouseY >= 241 && mouseY <= 252) {
            musicOption = !musicOption
            if(musicOption) {
                musicMessage = "Musica:   Activada"
            }else {
                musicMessage = "Musica:   Desactivada"
            }
    }

    //boton de sonidos
    if(mouseX >= 162 && mouseX <= 173 && mouseY >= 264 && mouseY <= 275) {
        soundsOption = !soundsOption
        if(soundsOption) {
            soundsMessage = "Sonidos:   Activados"
            soundLeft = new Audio('./sounds/left2.ogg');
            soundRight = new Audio('./sounds/right2.ogg');
            soundDown = new Audio('./sounds/down.ogg');
            rotate = new Audio('./sounds/rotate2.ogg')
            place = new Audio('./sounds/place.ogg');
            linePoint = new Audio('./sounds/line2.ogg');
            lose = new Audio('./sounds/lose.ogg')
        }else {
            soundsMessage = "Sonidos:   Desactivados"
            soundLeft = undefined
            soundRight = undefined
            soundDown = undefined
            rotate = undefined
            place = undefined
            linePoint = undefined
            lose = undefined
        }
    }

    //boton de autovelocidad
    if(mouseX >= 250 && mouseX <= 261 && mouseY >= 281 && mouseY <= 292) {
        difficultOption = !difficultOption
        if(difficultOption){
            difficultMessage = "Autovelocidad:   Activado"
        }else {
            difficultMessage = "Autovelocidad:   Desctivado"
        }
    }

    //boton de glow
    if(mouseX >= 237 && mouseX <= 450 && mouseY >= 583 && mouseY <= 627) {
        glowOption = !glowOption
    }
}

function musicOn() {
    if (musicOption == true) {
        return "green"

    }
    else{
        return "red"

    }
}   

function soundsOn() {
    if (soundsOption == true) {
        return "green"
    }
    else{
        return "red"
    }
}   

function difficultOn() {
    if (difficultOption == true) {
        return "green"
    }
    else{
        return "red"
    }
}   