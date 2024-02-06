const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "A) Rome", correct: false },
      { text: "B) Berlin", correct: false },
      { text: "C) Paris", correct: true },
      { text: "D) Madrid", correct: false },
    ],
  },
  {
    question: "Who is the author of 'To Kill a Mockingbird",
    answer: [
      { text: "A) J.K. Rowling", correct: false },
      { text: "B) Harper Lee", correct: true },
      { text: "C) Stephen King", correct: false },
      { text: "D) Charles Dickens", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: [
      { text: "A) Go", correct: false },
      { text: "B) Au", correct: true },
      { text: "C) Ag", correct: false },
      { text: "D) Gd", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "A) Jupiter", correct: false },
      { text: "B) Venus ", correct: false },
      { text: "C) Mars", correct: true },
      { text: "D) Saturn ", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
  currentQuestion.answer.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = item.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (item.correct) {
      button.dataset.correct = item.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
startQuiz();

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    hideRandom();
  }
}
function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${
    questions.length
  } that means that the is percentage ${(score / questions.length) * 100}%
  `;
  nextBtn.innerHTML = "play again";
  nextBtn.style.display = "block";
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    showRandom();
  }
  articleRandom.innerHTML = `<p>you don't know the answer ? press the button blow to get the correct answer</p>`;
});

const articleRandom = document.querySelector("article");
const randomBtn = document.querySelector(".random-btn");
randomBtn.addEventListener("click", () => {
  if (currentQuestionIndex === 0) {
    articleRandom.innerHTML = "<h1>C) Paris</h1>";
  } else if (currentQuestionIndex === 1) {
    articleRandom.innerHTML = "<h1>B) Harper Lee</h1>";
  } else if (currentQuestionIndex === 2) {
    articleRandom.innerHTML = "<h1>B) Au</h1>";
  } else if (currentQuestionIndex === 3) {
    articleRandom.innerHTML = "<h1>C) Mars</h1>";
  }
});

function hideRandom() {
  articleRandom.classList.add("hide");
  randomBtn.classList.add("hide");
}
function showRandom() {
  articleRandom.classList.remove("hide");
  randomBtn.classList.remove("hide");
}
