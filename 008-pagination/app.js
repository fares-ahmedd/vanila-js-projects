import fetchFollowers from "./fetchFollowers.js";
import displayFollowers from "./displayFollowers.js";
import paginate from "./paginate.js";
import displayButtons from "./displayButtons.js";
const title = document.querySelector(".section-title h1");
const btnContainer = document.querySelector(".btn-container");

let index = 0;
let pages = [];
const setupUi = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

const init = async () => {
  const followers = await fetchFollowers();
  title.textContent = "Pagination";
  pages = paginate(followers);
  setupUi();
};

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index);
    setupUi();
  } else if (e.target.classList.contains("prev-btn")) {
    if (index === 0) {
      index = pages.length - 1;
      setupUi();
      return;
    }
    index--;
    setupUi();
  } else if (e.target.classList.contains("next-btn")) {
    if (index === pages.length - 1) {
      index = 0;
      setupUi();

      return;
    }
    index++;
    setupUi();
  }
});

window.addEventListener("load", init);
