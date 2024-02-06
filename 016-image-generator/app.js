const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
const imagesContainer = document.querySelector("article");
const images = document.querySelectorAll(".image img");

// ! vars
const key = "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";

//! functions

//! events

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 3,
      size: "256x256",
    }),
  };
  console.log(images);
  images.forEach((image) => (image.src = "3D-printing.svg"));
  const res = await fetch(
    `https://api.openai.com/v1/images/generations`,
    methods
  );
  const data = await res.json();
  input.value = "";
  console.log(data);
  if (data) {
    const html = data.data
      .map((item) => {
        return `
          <div class="image">
          <img src="${item.url}" alt="AI IMAGE">
      </div>
          `;
      })
      .join("");
    imagesContainer.innerHTML = html;
  }
});
