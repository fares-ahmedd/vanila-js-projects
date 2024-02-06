// selections
const container = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const authorText = document.querySelector("strong");
const twitterBtn = document.querySelector(".twitter-button");
const newQuoteBtn = document.querySelector("#new-quote");
const loading = document.querySelector(".loading");
// logic
let apiQuo;
// on load
async function getQuo() {
  const URL = "https://api.quotable.io/random";
  try {
    showLoader();
    const response = await fetch(URL);
    apiQuo = await response.json();
    displayQuote();
    hideLoader();
    // throw new Error("oops");
  } catch (error) {
    console.log(error);
    getQuo();
  }
}
getQuo();

// todo: new quote;
function displayQuote() {
  authorText.textContent = apiQuo.author;
  quoteText.innerHTML = `
  <i class="fa-solid fa-quote-left"></i> ${apiQuo.content}
  `;
}

// todo: newText btn
newQuoteBtn.addEventListener("click", getQuo);

// todo: tweet things
function tweetQuo() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${apiQuo.content} - ${apiQuo.author}`;
  window.open(twitterUrl, "_blank");
}
twitterBtn.addEventListener("click", tweetQuo);

// todo: show loader
function showLoader() {
  container.classList.add("hidden");
  loading.classList.remove("hidden");
}
// todo: hide loader
function hideLoader() {
  container.classList.remove("hidden");
  loading.classList.add("hidden");
}
