const msgEl = document.getElementById("msg");
const randomNum = getRandomNumber();

//! functions
console.log(`number: ` + randomNum);
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
console.log(randomNum);
// ! events

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();
function onSpeak(e) {
  const message = e.results[0][0].transcript;
  writeMessage(message);
  checkMessage(message);
}
function writeMessage(message) {
  msgEl.innerHTML = `
  <div>you said: <span class="box">${message}</span></div>
  `;
}
function checkMessage(message) {
  const num = parseInt(message);
  console.log(num);
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div class="wrong">that is not a valid number</div>`;
    msgEl.querySelector(".wrong").style.color = "#9d1d1d";
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div class="hint">number must be between 1 and 100</div>`;
    msgEl.querySelector(".hint").style.color = "#a1edff";
    return;
  }
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>you have guessed the number right ! it was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
    const playAgainBtn = document.querySelector(".play-again");
    playAgainBtn.addEventListener("click", () => location.reload());
    playAgainBtn.style.cursor = "pointer";
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}
recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());
