const buttons = [...document.querySelectorAll("button")];
const span = document.querySelector("span");
const winnerTitle = document.querySelector("h4");
// ! vars
let winnerArray = [];
// ! functions
function winner() {
  buttons.forEach((btn, __, array) => {
    if (
      array[0].textContent === array[1].textContent &&
      array[1].textContent === array[2].textContent &&
      array[0].textContent !== ""
    ) {
      console.log("row 1");
      checkWinnerAndStopApp(array[0].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[3].textContent === array[4].textContent &&
      array[4].textContent === array[5].textContent &&
      array[3].textContent !== ""
    ) {
      console.log("row 2");
      checkWinnerAndStopApp(array[3].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[6].textContent === array[7].textContent &&
      array[7].textContent === array[8].textContent &&
      array[6].textContent !== ""
    ) {
      console.log("row 3");
      checkWinnerAndStopApp(array[6].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[0].textContent === array[3].textContent &&
      array[3].textContent === array[6].textContent &&
      array[0].textContent !== ""
    ) {
      console.log("Column 1");
      checkWinnerAndStopApp(array[0].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[1].textContent === array[4].textContent &&
      array[4].textContent === array[7].textContent &&
      array[1].textContent !== ""
    ) {
      console.log("Column 2");
      checkWinnerAndStopApp(array[1].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[2].textContent === array[5].textContent &&
      array[5].textContent === array[8].textContent &&
      array[2].textContent !== ""
    ) {
      console.log("Column 3");
      checkWinnerAndStopApp(array[2].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[0].textContent === array[4].textContent &&
      array[4].textContent === array[8].textContent &&
      array[0].textContent !== ""
    ) {
      console.log("line 1");
      checkWinnerAndStopApp(array[0].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    } else if (
      array[2].textContent === array[5].textContent &&
      array[5].textContent === array[8].textContent &&
      array[2].textContent !== ""
    ) {
      console.log("line 2");
      checkWinnerAndStopApp(array[2].textContent);
      btn.disabled = true;
      btn.style.cursor = "auto";
    }
  });
}
function checkWinnerAndStopApp(theSign) {
  winnerTitle.style.backgroundColor = "green";
  if (theSign === "X") {
    winnerTitle.innerHTML = `
    the winner is : <span>X 🎁</span> 
    `;
  } else {
    winnerTitle.innerHTML = `
    the winner is : <span>O 🎁</span>
    `;
  }
}
let togglePlayer = false;
// ! events
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "") {
      if (!togglePlayer) {
        btn.textContent = `X`;
        togglePlayer = !togglePlayer;
        btn.style.color = "red";
        span.style.color = "white";
        span.textContent = "O";
      } else {
        togglePlayer = !togglePlayer;
        btn.textContent = `O`;
        span.style.color = "red";
        span.textContent = "X";
      }
    }
    winner();
  });
});

span.style.color = "red";
