// app.js
const express = require('express');
const path = require('path');
const app = express();

// Load image and quiz data
const images = require('./data/images.json');
const quizzes = require('./data/quizzes.json');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get images
app.get('/api/images', (req, res) => {
  res.json(images);
});

// API endpoint to get quiz questions
app.get('/api/quizzes', (req, res) => {
  res.json({ questions: quizzes });
});

// API endpoint to submit quiz answers
app.post('/api/quizzes/submit', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const results = quizzes.map((question, index) => {
    const isCorrect = userAnswers[index] === question.correctOption;
    if (isCorrect) score++;
    return {
      questionId: question.id,
      isCorrect,
      correctOption: question.correctOption,
      explanation: question.explanation
    };
  });
  res.json({ score, total: quizzes.length, results });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
