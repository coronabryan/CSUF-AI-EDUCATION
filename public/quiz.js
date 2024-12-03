let currentQuestionIndex = 0;
let userAnswers = [];
let questions = [];

async function fetchQuestions() {
  const response = await fetch('/api/quizzes');
  const data = await response.json();
  questions = data.questions;
  displayQuestion(questions[currentQuestionIndex]);
}

function displayQuestion(question) {
  document.getElementById('question').innerText = question.question;
  document.getElementById('optionA').innerText = `A: ${question.options.A}`;
  document.getElementById('optionB').innerText = `B: ${question.options.B}`;
  document.getElementById('optionC').innerText = `C: ${question.options.C}`;
  document.getElementById('optionD').innerText = `D: ${question.options.D}`;
  document.getElementById('next-btn').disabled = true;
}

function selectOption(option) {
  userAnswers[currentQuestionIndex] = option;
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    submitAnswers();
  }
}

async function submitAnswers() {
  const response = await fetch('/api/quizzes/submit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ answers: userAnswers }),
  });
  const results = await response.json();
  displayResults(results);
}

function displayResults(results) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<h2>Your Score: ${results.score}/${results.total}</h2>`;
  results.results.forEach((result, index) => {
    const question = questions[index];
    const userAnswer = userAnswers[index];
    const correctness = result.isCorrect ? 'Correct' : 'Incorrect';
    const explanation = result.explanation;
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `
      <h3>${question.question}</h3>
      <p>Your Answer: ${userAnswer} - ${correctness}</p>
      <p>Correct Answer: ${result.correctOption}</p>
      <p>${explanation}</p>
    `;
    quizContainer.appendChild(resultDiv);
  });
}

fetchQuestions();
