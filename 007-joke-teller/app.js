const btn = document.querySelector(".btn");
const audioElement = document.querySelector("audio");

// toggle btn
function toggleButton() {
  btn.disabled = !btn.disabled;
}

// passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "d8cb7fab78394ef68bb895a21188074a",
    src: `${joke}`,
    hl: "en-gb",
    v: "Jack",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

const URL = "https://official-joke-api.appspot.com/random_joke";
let joke = "";
async function getJoke() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.punchline}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log(`the error cux ${error}`);
  }
}
btn.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
