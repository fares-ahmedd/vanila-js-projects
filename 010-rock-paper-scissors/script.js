// import { startConfetti, removeConfetti } from "./confetti.js";
const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};
// reset all selected icons
function resetSelectedIcons() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

let computerChoice = "";
let playerScoreNumber = 0;
let computerScoreNumber = 0;

function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}

function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "it's a tie.";
    resultText.style.color = "black";
    // stopConfetti();
    // removeConfetti();
    import("./confetti.js").then((module) => {
      module.removeConfetti();
    });
  } else {
    const choice = choices[playerChoice];
    console.log(choice);
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Won!";
      resultText.style.color = "green";
      playerScoreNumber++;

      playerScoreEl.textContent = playerScoreNumber;
      import("./confetti.js").then((module) => {
        module.startConfetti();
      });
    } else {
      resultText.textContent = "You lost!";
      resultText.style.color = "red";
      // stopConfetti();
      import("./confetti.js").then((module) => {
        module.removeConfetti();
      });

      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// add select computer
function displayComputerChoice() {
  // add selected styling
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

// call function to process turn
function checkResult(playerChoice) {
  resetSelectedIcons();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
  resetSelectedIcons();
  checkResult(playerChoice);
  // add selected styling
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}
window.select = select;

function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  resultText.textContent = "";
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resetSelectedIcons();
  // stopConfetti();
  import("./confetti.js").then((module) => {
    module.removeConfetti();
  });
}

window.resetAll = resetAll;
