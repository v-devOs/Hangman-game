//Variables de uso global
let statusGame = false;
let rowTopKeyBoard = ["q","w","e","r","t","y","u","i","o","p"];
let rowMediumKeyBoard = ["a","s","d","f","g","h","j","k","l"]
let rowBottomKeyBoard = ["z","x","c","v","b","n","m"]

//Instruccion de iniciar el juego
$(document).on("keypress",function(event){
    //Por el momento lo coloco con la tecla A para hacer pruebas despues cambiara a la tecla enter
    if(!statusGame && (event.key === "A" || event.key ==="a")){
        $("#title-instructions").remove();
        drawKeyBoard();
    }
    
    
})
//Dibujando el teclado
function drawKeyBoard(){
    drawRowKeyBoard(rowTopKeyBoard,"Top");
    drawRowKeyBoard(rowMediumKeyBoard,"Medium");
    drawRowKeyBoard(rowBottomKeyBoard,"Bottom");

    function drawRowKeyBoard(rowKeyBoard,rowToDraw){
        for (let i = 0; i < rowKeyBoard.length; i++) {
            $("#row"+rowToDraw).append('<button class="keyBoardKey">'+rowKeyBoard[i]+'</button>');
            
        }
    }
}

