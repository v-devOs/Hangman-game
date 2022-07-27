//Variables de uso global
let statusGame = false;
let fails = 0;
let success = 0;
let x = 0;
let lettersUsed = [];
var phrase;

//Instruccion de iniciar el juego
startGame(statusGame);

function startGame(statusGame) {
  $(document).on("keypress", async () => {
    //Inicio del juego
    if (!statusGame) {
      $("#messege-game-finished").text("");
      $("#title-instructions").text("");
      statusGame = true;
      //Llamado de la función para traer la frase
      phrase = await getPhrase();
      //Dibujando teclado y celdas para la frase
      drawKeyBoard();
      drawCellsToPharse(phrase);
      showCharactersSpecials();
    }
  });
}
//Llama a la Api para obtener la frase generada aleatoriamente.
const getPhrase = async () => {
  const numeroDeLetrasMaximoDeLaFrase = 30;
  const response = await fetch(
    `https://api.quotable.io/random?maxLength=${numeroDeLetrasMaximoDeLaFrase}`
  );
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
const drawCellsToPharse = (phraseToCell) => {
  for (let i = 0; i < phraseToCell.length; i++) {
    //Generando id Dinamico
    let cellId = 'id="cell' + i + '"';
    $("#spaceToCellsPharse").append(
      '<span class="cellToPharse"' + cellId + "></span>"
    );
  }
};
//Añandiendo eventos a los botones
$(document).on("click", ".keyBoardKey", function () {
  let buttonInner = this.textContent;
  //Añadiendo clase respectiva a si es correcta o no el valor de la tecla
  if (checkKeyPressed(buttonInner) === "correct") {
    $(this).addClass("keyPressedCorrect");
  } else {
    $(this).addClass("keyPressedIncorrect");
  }
});
// Funcion que verifica si el valor de la tecla pulsada existe en la frase generada
const checkKeyPressed = (keyPressed) => {
  let arrayFromPharse = Array.from(phrase);
  //Verificando y devolviendo valor
  if (arrayFromPharse.includes(keyPressed)) {
    if (!lettersUsed.includes(keyPressed)) {
      showLettersAppear(arrayFromPharse, keyPressed);
      lettersUsed.push(keyPressed);
    }
    return "correct";
  } else {
    changeValuesFail();
    return "incorrect";
  }
};
//Funcion que muestra los caracteres especiales de la frase generada
const showCharactersSpecials = () => {
  let characters = [" ", ",", ".", ";", "'", "!"];
  let arrayFromPharse = Array.from(phrase);
  for (let i = 0; i < characters.length; i++) {
    if (arrayFromPharse.includes(characters[i])) {
      showLettersAppear(arrayFromPharse, characters[i]);
    }
  }
};
//Funcion que se ejecuta solo en caso de que la letra del boton pulsado exista en la frase generada
const showLettersAppear = (array, letter) => {
  //Verificando si la letra pulsada existe en la frase
  let indices = [];
  let idx = array.indexOf(letter);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(letter, idx + 1);
  }
  // Mostrando las letras de la tecla pulsada que aparecen en la frase
  for (let i = 0; i < indices.length; i++) {
    if (letter == " ") {
      $("#cell" + indices[i]).removeClass("cellToPharse");
      $("#cell" + indices[i]).addClass("emptyCellToPhrase");
    } else {
      $("#cell" + indices[i]).text(letter);
    }
  }
  success += indices.length;
  if (success === phrase.length) {
    finishedGame(fails, success, statusGame);
  }
};
//Con esta funcion vamos cambiando la imagen que se muestra de monito
const changeValuesFail = () => {
  if (fails < 9) {
    fails++;
    $(".game-image img").attr("src", `./assets/img/${fails}.jpg`);
  }
  //Si ya perdió el usuario aquí deberíamos de mostrar una pantalla de que perdió e iniciar de nuevo
  else {
    $(".game-image img").attr("src", `./assets/img/dead.png`);
    finishedGame(fails, success, statusGame);
  }
};

//Funcion que se ejecuta al alcanzar el limite de errores o completar la frase generada
const finishedGame = (fails, success, statusGame) => {
  //Borando teclado y cambiando estado del juego
  $(".keyBoardKey").remove();
  statusGame = false;
  //Colocando un mensaje al jugador
  if (success === phrase.length) {
    $("#messege-game-finished").text("Congratulations!! YOU WON!!");
  } else if (fails === 9) {
    $("#messege-game-finished").text(
      "Good look next time :( you lose in " + fails + " attempts"
    );
  }
  //Instrucciones para inicial el juego nuevamente
  $("#title-instructions").text("Press any key to play again");
  $(".cellToPharse").remove();
  $(".emptyCellToPhrase").remove();
  startGame(statusGame);
};
