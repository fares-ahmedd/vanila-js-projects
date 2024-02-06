// ! selectors
const startBtn = document.querySelector(".control-buttons span");
const theName = document.querySelector(".name span");
const overlay = document.querySelector(".control-buttons");
const timeout = document.querySelector(".time-out span");
const lostGame = document.querySelector(".lost-screen");
const playAgainBtn = document.querySelector(".play-again-btn");
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = [...document.querySelectorAll(".game-block")];
const success = document.getElementById("success");
const fail = document.getElementById("fail");
// ! vars
const duration = 1000;
let orderRange = [...Array(blocks.length).keys()];
let isWin = setInterval(checkIfWins, 1000);
let time = 120;
let initialTime = 0;
let isWins;

// ! functions
function shuffleArray(array) {
  let current = array.length;
  let random, temp;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function checkIfWins() {
  isWins = blocks.find((block) => !block.classList.contains("has-match"));
  console.log(isWins);
  if (!isWins) {
    lostGame.classList.remove("hidden");
    document.querySelector(".lost-screen h1").textContent = "you wins!";
    document.querySelector(".lost-screen h1").style.color = "green";
    clearInterval(initialTime);
  }
}
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let filteredBlock = blocks.filter((flip) =>
    flip.classList.contains("is-flipped")
  );
  if (filteredBlock.length % 2 === 0) {
    stopClicking();
    checkMatchedBlocks(filteredBlock[0], filteredBlock[1]);
  }
}
function checkMatchedBlocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    const blocks = [firstBlock, secondBlock];
    blocks.forEach((block) => block.classList.remove("is-flipped"));
    blocks.forEach((block) => block.classList.add("has-match"));
    success.play();
  } else {
    tries.textContent = +tries.textContent + 1;
    const blocks = [firstBlock, secondBlock];
    setTimeout(() => {
      blocks.forEach((block) => block.classList.remove("is-flipped"));
    }, duration);
    fail.play();
  }
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
function updateTime() {
  time--;
  timeout.textContent = time + "s";
  if (time === 0) {
    lostGame.classList.remove("hidden");
    clearInterval(initialTime);
  }
}

// ! events
window.addEventListener("DOMContentLoaded", shuffleArray(orderRange));
startBtn.addEventListener("click", () => {
  let youName = prompt("what's your name?");
  if (!youName) {
    theName.textContent = "unknown".toUpperCase();
  } else {
    theName.textContent = youName.toUpperCase();
  }
  initialTime = setInterval(updateTime, 1000);

  overlay.remove();
});

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => flipBlock(block));
});

playAgainBtn.addEventListener("click", () => location.reload());
