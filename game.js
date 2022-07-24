//Variables de uso global
let statusGame = false;
let rowTopKeyBoard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
let rowMediumKeyBoard = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
let rowBottomKeyBoard = ["z", "x", "c", "v", "b", "n", "m"];

//Instruccion de iniciar el juego
$(document).on("keypress", async (event) => {
  //Por el momento lo coloco con la tecla A para hacer pruebas despues cambiara a la tecla enter
  if (!statusGame && (event.key === "A" || event.key === "a")) {
    $("#title-instructions").remove();
    drawKeyBoard();
    statusGame = true;
    //Llamado de la función para traer la frase
    const phrase = await getPhrase();
    //Incertar frase al html
    $("#phrase").text(phrase);
  }
});

//Dibujando el teclado
function drawKeyBoard() {
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
//Llama a la Api para obtener la frase generada aleatoriamente.
const getPhrase = async () => {
  const response = await fetch("http://api.quotable.io/random?maxLength=35");
  const phrase = await response.json();
  return phrase.content;
};
