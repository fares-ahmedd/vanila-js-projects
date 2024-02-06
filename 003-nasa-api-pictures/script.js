const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");
const favBtn = document.querySelector(".fav-btn");
const loadMoreBtns = document.querySelectorAll(".load-more-btn");
const count = 5;
const apiKey = `ra8eX6RSloehOBE3TUR9U73Xvk3OaZfVrfpHj7d1`;
const URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
let resultsArray = [];
let favArray = JSON.parse(localStorage.getItem("fav")) || [];
let isNotFav = true;
function upDateDOM() {
  imagesContainer.innerHTML = resultsArray.map((item) => {
    return `
        <div class="card">
                <a href="${item.hdurl}" title="View Full Image" target="_blank">
                    <img src="${item.url}"
                        alt="NASA PIC">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="clickable">Add to Favorites</p>
                    <p class="card-text">${item.explanation}</p>
                    <small class="text-muted">
                        <strong>${item.date}</strong>
                        <span>${
                          item.copyright ? item.copyright : "no copyright"
                        }</span>
                    </small>
                </div>
            </div>
        `;
  });
  const clickable = document.querySelectorAll(".images-container .clickable");
  clickable.forEach((click) => {
    click.addEventListener("click", addToFav);
  });
}

// get images from NASA API

async function getNasaPic() {
  try {
    loader.classList.remove("hidden");
    const response = await fetch(URL);
    resultsArray = await response.json();
    upDateDOM();
    loader.classList.add("hidden");
    const clickable = document.querySelectorAll(".images-container .clickable");
    clickable.forEach((click) => {
      click.addEventListener("click", addToFav);
    });
  } catch (error) {
    console.log(`hoops something want wrong, ${error}`);
  }
}
window.addEventListener("load", getNasaPic());

function addToFav(e) {
  //   console.log(e.target.nextSibling.nextSibling.textContent);
  resultsArray.forEach((item) => {
    if (item.explanation === e.target.nextSibling.nextSibling.textContent) {
      saveConfirmed.classList.remove("hidden");
      if (
        !favArray.some((favItem) => favItem.explanation === item.explanation)
      ) {
        favArray.push(item);
        favArray = Array.from(new Set(favArray));

        localStorage.setItem("fav", JSON.stringify(favArray));
      }
      // set to local Storage
      setTimeout(() => {
        saveConfirmed.classList.add("hidden");
      }, 1000);
      e.target.textContent = "added to favorites";
      e.target.style.color = "green";
      e.target.style.cursor = "initial";
    }
  });
}

favBtn.addEventListener("click", () => {
  resultsNav.classList.add("hidden");
  favoritesNav.classList.remove("hidden");
  isNotFav = false;

  displayFav();
  if (favArray.length === 0) {
    imagesContainer.innerHTML = `<h1>you haven't add any favorite yet</h1>`;
  }
  window.scrollTo({
    top: 0,
    // behavior: "smooth",
  });
});

function displayFav() {
  imagesContainer.innerHTML = favArray.map((item) => {
    return `
            <div class="card">
                    <a href="${
                      item.hdurl
                    }" title="View Full Image" target="_blank">
                        <img src="${item.url}"
                            alt="NASA PIC">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="remove-btn">remove from Favorites</p>
                        <p class="card-text">${item.explanation}</p>
                        <small class="text-muted">
                            <strong>${item.date}</strong>
                            <span>${
                              item.copyright ? item.copyright : "no copyright"
                            }</span>
                        </small>
                    </div>
                </div>
            `;
  });
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
      console.log(e.target.nextSibling.nextSibling.textContent);
      favArray = favArray.filter((item) => {
        return (
          item.explanation !== e.target.nextSibling.nextSibling.textContent
        );
      });
      localStorage.setItem("fav", JSON.stringify(favArray));
      if (favArray.length === 0) {
        imagesContainer.innerHTML = `<h1>you haven't add any favorite yet</h1>`;
      }
    });
  });
}

loadMoreBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.reload();
  });
});

let ready = true;
window.addEventListener("scroll", async () => {
  console.log(isNotFav);
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready &&
    isNotFav
  ) {
    // console.log(`window.innerHeight: ${window.innerHeight} `); // حجم الشاشة بالطول
    // console.log(`window.scrollY: ${window.scrollY} `); // حجم الاسكرول
    // console.log(`document.body.offsetHeight: ${document.body.offsetHeight} `); // حجم الشاشة ككل
    ready = false;
    const response = await fetch(URL);
    const addArray = await response.json();
    resultsArray.push(...addArray);
    upDateDOM();
    ready = true;
  }
});
