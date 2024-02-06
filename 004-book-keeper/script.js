import getElement from "./getElement.js";

const addBookmarkBtn = getElement("#show-model");
const addBookmarkEl = document.querySelector(".add-bookmarks");
const form = document.querySelector("form");
const websiteNameEl = document.querySelector("#website-name");
let websiteURLEl = document.querySelector("#website-url");
const closeBtn = document.querySelector(".close-btn");
const bookmarksContainer = document.querySelector("#bookmarks-container");

let bookmarks = [];

addBookmarkBtn.addEventListener("click", () => {
  addBookmarkEl.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  addBookmarkEl.classList.remove("show");
});
function saveFunc() {
  addBookmarkEl.classList.remove("show");
}

function fetchBookmarks() {
  if (JSON.parse(localStorage.getItem("bookmarks"))) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Fares Ahmed",
        url: "https://www.facebook.com/profile.php?id=100005496826371",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url === url) {
      bookmarks.splice(index, 1);
    }
  });
  // update bookmarks array in localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// build bookmarks DOM
function buildBookmarks() {
  // remove all bookmark element
  bookmarksContainer.textContent = "";
  bookmarks.forEach((bookmarks) => {
    const { name, url } = bookmarks;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.addEventListener("click", () => {
      deleteBookmark(url);
    });
    closeIcon.setAttribute("title", `remove the content`);
    // favicon / link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const img = document.createElement("img");
    console.log(url);
    img.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    img.setAttribute("alt", `${name}`);
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", `_blank`);

    // append and prepend
    link.textContent = `${name}`;
    linkInfo.prepend(img);
    linkInfo.appendChild(link);
    item.prepend(closeIcon);
    item.appendChild(linkInfo);
    bookmarksContainer.appendChild(item);
  });
}
form.addEventListener("submit", saveData);
// validate
function validate(nameValue, urlValue) {
  const exp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(exp);
  if (!nameValue || !urlValue) {
    alert("please submit value for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("please provide web address");
    return false;
  }
  return true;
}
function saveData(e) {
  e.preventDefault();
  const websiteName = websiteNameEl.value;
  let websiteURL = websiteURLEl.value;
  if (!websiteURL.includes("http://", "https://")) {
    websiteURL = `https://${websiteURL}`;
  }
  if (!validate(websiteName, websiteURL)) {
    return false;
  }
  const bookmark = {
    name: websiteName,
    url: websiteURL,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  saveFunc();
  form.reset();
}

// website on load
window.addEventListener("DOMContentLoaded", fetchBookmarks());
