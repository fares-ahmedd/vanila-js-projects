const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const hidden = document.querySelector(".hidden");
//! vars
let limit = 3;
let page = 1;
let number = 1;
let URL = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
const observer = new IntersectionObserver(showLoading, {
  root: null,
  threshold: 0.15,
  rootMargin: "100px",
});
//! functions
async function getPosts() {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
}

async function showPosts() {
  console.log("happening");
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${number++}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
}
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      limit += 5;
      showPosts();
    }, 300);
  }, 1000);
}

//! events listeners
window.addEventListener("DOMContentLoaded", showPosts);

filter.addEventListener("input", (e) => {
  const key = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").textContent.toUpperCase();
    const body = post.querySelector(".post-body").textContent.toUpperCase();
    if (title.indexOf(key) > -1 || body.indexOf(key) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
    if (key.length === 0) {
      post.style.display = "flex";
      console.log("done");
    }
  });
});
observer.observe(hidden);
