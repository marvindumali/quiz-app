const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
    correct: 0,
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mars", "Earth", "Mercury", "Venus"],
    correct: 2,
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "PHP", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hot Mail",
      "How to Make Lasagna",
      "None of the above",
    ],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const introElement = document.getElementById("intro");
const quizElement = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const resultMessageElement = document.getElementById("result-message");
const resultButton = document.getElementById("result-btn");

function startQuiz() {
  introElement.classList.add("hidden");
  quizElement.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  options.forEach((option, index) => {
    option.innerText = currentQuestion.options[index];
    option.disabled = false;
    option.style.backgroundColor = "#3498db";
  });
  nextButton.style.display = "none";
}

function selectOption(index) {
  const correctOption = quizData[currentQuestionIndex].correct;
  if (index === correctOption) {
    score++;
    options[index].style.backgroundColor = "#2ecc71";
  } else {
    options[index].style.backgroundColor = "#e74c3c";
    options[correctOption].style.backgroundColor = "#2ecc71";
  }
  options.forEach((option) => (option.disabled = true));
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizElement.classList.add("hidden");
  resultElement.classList.remove("hidden");
  let message = "";
  if (score <= 2) {
    message = `Oh no! 😔 You scored ${score} out of 5. But don't worry, you can try again and improve your score! 💪`;
    resultButton.innerText = "Try Again";
  } else if (score <= 4) {
    message = `Good job! 👍 You scored ${score} out of 5. You're almost there! Give it another shot to get a perfect score! 🌟`;
    resultButton.innerText = "Try Again";
  } else {
    message = `Amazing! 🎉 You scored a perfect ${score} out of 5! You really know your stuff! 🏆`;
    resultButton.innerText = "End";
  }
  resultMessageElement.innerText = message;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.classList.add("hidden");
  if (resultButton.innerText === "End") {
    introElement.classList.remove("hidden");
  } else {
    quizElement.classList.remove("hidden");
    loadQuestion();
  }
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
