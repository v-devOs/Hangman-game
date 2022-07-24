//Variables de uso global
let statusGame = false;
var phrase;
//Instruccion de iniciar el juego
$(document).on("keypress", async (event) => {
  //Por el momento lo coloco con la tecla A para hacer pruebas despues cambiara a la tecla enter
  if (!statusGame && (event.key === "A" || event.key === "a")) {
    $("#title-instructions").remove();
    drawKeyBoard();
    statusGame = true;
    //Llamado de la función para traer la frase
     phrase = await getPhrase();
    //Incertar frase al html
    $("#phrase").text(phrase);
  }
});
//Dibujando el teclado
function drawKeyBoard() {
  let rowTopKeyBoard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let rowMediumKeyBoard = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let rowBottomKeyBoard = ["z", "x", "c", "v", "b", "n", "m"];

  drawRowKeyBoard(rowTopKeyBoard, "Top");
  drawRowKeyBoard(rowMediumKeyBoard, "Medium");
  drawRowKeyBoard(rowBottomKeyBoard, "Bottom");

  function drawRowKeyBoard(rowKeyBoard, rowToDraw) {
    for (let i = 0; i < rowKeyBoard.length; i++) {
      
      $("#row" + rowToDraw).append(
        '<button class="keyBoardKey">' + rowKeyBoard[i] + "</button>"
      );
    }
  }
}
//Añandiendo eventos a los botones
$(document).on("click",".keyBoardKey",function(){
  let buttonInner = this.textContent; 
  //Añadiendo clase respectiva a si es correcta o no el valor de la tecla
  if(checkKeyPressed(buttonInner) === "correct"){$(this).addClass("keyPressedCorrect");}
  else{$(this).addClass("keyPressedIncorrect");}
})
//Llama a la Api para obtener la frase generada aleatoriamente.
const getPhrase = async () => {
  const response = await fetch("http://api.quotable.io/random?maxLength=35");
  const phrase = await response.json();
  return phrase.content;
};
//Funcion que verifica si el valor de la tecla pulsada existe en la frase generada
function checkKeyPressed(keyPressed){
  let arrayFromPharse = phrase.split('');
  //Verificando y devolviendo valor
  if(arrayFromPharse.includes(keyPressed)){return "correct";}
  else{return "incorrect";}
}