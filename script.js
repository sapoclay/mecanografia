const keys = document.querySelectorAll("li");
const timestamps = [];
let correctCount = 0;
let incorrectCount = 0;
let shiftPressed = false;
let capsLockOn = false;

timestamps.unshift(getTimestamp());
targetRandomKey();

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)].id;
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  if (key) {
    key.classList.add("selected");
    let start = Date.now();
  }
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function updateCorrectCount() {
  const correctCountElement = document.getElementById("correct-key-count");
  correctCountElement.textContent = `Pulsaciones correctas: ${correctCount}`;
}

function updateIncorrectCount() {
  const incorrectCountElement = document.getElementById("incorrect-key-count");
  incorrectCountElement.textContent = `Pulsaciones incorrectas: ${incorrectCount}`;
}

document.addEventListener("keydown", event => {
  if (event.key === "Shift" || event.key === "ShiftLeft" || event.key === "ShiftRight") {
    shiftPressed = true;
    event.preventDefault();
    return;
  }

  if (event.code === "CapsLock") {
    capsLockOn = !capsLockOn;
    event.preventDefault();
    return;
  }

  if (event.code === "Escape") {
    console.log("Tecla Escape presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "Backspace") {
    console.log("Tecla Backspace presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "BracketLeft") {
    console.log("Tecla [ presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "BracketRight") {
    console.log("Tecla ] presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "Quote") {
    console.log("Tecla ' presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "Semicolon" && shiftPressed) {
    console.log("Tecla : presionada");
    event.preventDefault();
    return;
  }

  if (event.code === "Backquote") {
    console.log("Tecla Borrar presionada");
    event.preventDefault();
    return;
  }

  const keyPressed = event.key.toUpperCase();
  const keyElement = Array.from(keys).find(key => key.textContent === keyPressed);
  const highlightedKey = document.querySelector(".selected");

  if (keyElement) {
    if (
      (keyPressed === highlightedKey.innerHTML && !shiftPressed && !capsLockOn) ||
      (event.key === "+" && shiftPressed)
    ) {
      keyElement.classList.add("hit");
      keyElement.addEventListener("animationend", () => {
        keyElement.classList.remove("hit");
      });

      timestamps.unshift(getTimestamp());
      const elapsedTime = timestamps[0] - timestamps[1];
      console.log(`Caracteres por minuto: ${60 / elapsedTime}`);
      highlightedKey.classList.remove("selected");
      targetRandomKey();
      correctCount++;
      updateCorrectCount();
    } else {
      incorrectCount++;
      updateIncorrectCount();
    }
  }
});

document.addEventListener("keyup", event => {
  if (event.key === "Shift" || event.key === "ShiftLeft" || event.key === "ShiftRight") {
    shiftPressed = false;
    event.preventDefault();
    return;
  }
});

document.addEventListener("keypress", event => {
  const charCode = event.charCode;
  if (charCode >= 97 && charCode <= 122) {
    // Caracter en minúscula
    capsLockOn = false;
  } else if (charCode >= 65 && charCode <= 90) {
    // Caracter en mayúscula
    capsLockOn = true;
  }
});