//Variables de uso global
let statusGame = false;
let fails = 0;
var phrase;
//Instruccion de iniciar el juego
$(document).on("keypress", async (event) => {
  //Inicio del juego
  if (!statusGame && event.code === "Enter") {
    $("#title-instructions").remove();
    statusGame = true;
    //Llamado de la función para traer la frase
    phrase = await getPhrase();
    //Dibujando teclado y celdas para la frase
    drawKeyBoard();
    drawCellsToPharse(phrase);
    showCharactersSpecials()  
    //Incertar frase al html
    $("#phrase").text(phrase);
  }
});
//Llama a la Api para obtener la frase generada aleatoriamente.
const getPhrase = async () => {
  const response = await fetch("http://api.quotable.io/random?maxLength=35");
  const phrase = await response.json();
  //Tuve que convertir la frase a minusculas :c
  return phrase.content.toLowerCase();
};
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
//Dibujando celdas de la frase
function drawCellsToPharse(phraseToCell){
  for (let i = 0; i < phraseToCell.length; i++) {
    //Generando id Dinamico
    let cellId = 'id="cell'+i+'"';
    $("#spaceToCellsPharse").append(    
      '<span class="cellToPharse"'+cellId+'></span>'
    );
  }
}
//Añandiendo eventos a los botones
$(document).on("click",".keyBoardKey",function(){
  let buttonInner = this.textContent; 
  //Añadiendo clase respectiva a si es correcta o no el valor de la tecla
  if(checkKeyPressed(buttonInner) === "correct"){$(this).addClass("keyPressedCorrect");}
  else{$(this).addClass("keyPressedIncorrect");}
})
//Funcion que verifica si el valor de la tecla pulsada existe en la frase generada
function checkKeyPressed(keyPressed){
  let arrayFromPharse = Array.from(phrase);
  //Verificando y devolviendo valor
  if(arrayFromPharse.includes(keyPressed)){
    showWordsAppear(arrayFromPharse,keyPressed);
    return "correct";
  }
  else{
    changeValuesFail();
    return "incorrect";
  } 
}

//Funcion que muestra los caracteres especiales de la frase generada
function showCharactersSpecials(){
  let characters = [" ",",",".",";"];
  let arrayFromPharse = Array.from(phrase);
  for (let i = 0; i < characters.length; i++) {
    showWordsAppear(arrayFromPharse,characters[i]);
  }
}
//Funcion que se ejecuta solo en caso de que la letra del boton pulsado exista en la frase generada
function showWordsAppear(array,word){
  //Verificando si la letra pulsada existe en la frase
  let indices = [];
  let idx = array.indexOf(word);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(word, idx + 1);
  }
  // Mostrando las letras de la tecla pulsada que aparecen en la frase
  for (let i = 0; i < indices.length; i++) {
    $("#cell"+indices[i]).text(word);
    
  }
}
//Con esta funcion vamos cambiando la imagen que se muestra de monito
function changeValuesFail(){
  fails++;
  $(".game-image img").attr("src","./assets/img/"+fails+".jpg")
}